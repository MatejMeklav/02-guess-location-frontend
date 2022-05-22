import axios from "axios";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import marker from "../Images/location_no_bg.png";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "../../Assets/Styles/location.css";
import { getDistance } from "geolib";
import Leaderboard from "./Leaderboard";
import { LoginStatus } from "../../Config/LoginStatus";
export default function LocationGuessLayout() {
  const { id } = useParams();
  const [image, setImage] = useState("");
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [positionLocation, setPositionLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [city, setCity] = useState("");
  const [town, setTown] = useState("");
  const [village, setVillage] = useState("");
  const [country, setCountry] = useState("");
  const [postNumber, setPostNumber] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [errorResponse, setErrorResponse] = useState("");
  const [leaderboardKey, setLeaderboardKey] = useState(0);
  const navigate = useNavigate();
  const userId = LoginStatus();
  const myIcon = new Icon({
    iconUrl: marker,
    iconSize: [32, 32],
  });
  const headers = {
    Authorization: "Bearer " + localStorage.getItem("key"),
  };

  const LocationMarker = () => {
    const map = useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition({
          latitude: lat,
          longitude: lng,
        });
        axios
          .get(
            "https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=" +
              lat +
              "&lon=" +
              lng
          )
          .then((response) => {
            if (response.data.address.village !== undefined) {
              setVillage(response.data.address.village);
            } else {
              setVillage("");
            }
            if (response.data.address.town !== undefined) {
              setTown(response.data.address.town);
            } else {
              setTown("");
            }
            if (response.data.address.city !== undefined) {
              setCity(response.data.address.city);
            } else {
              setCity("");
            }
            if (response.data.address.municipality !== undefined) {
              setMunicipality(response.data.address.municipality);
            } else {
              setMunicipality("");
            }
            if (response.data.address.postcode !== undefined) {
              setPostNumber(response.data.address.postcode);
            } else {
              setPostNumber("");
            }
            setCountry(response.data.address.country);
          })
          .catch((error) => {
            console.log(error.response);
          });
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    return position.latitude !== 0 ? (
      <Marker
        position={[position.latitude, position.longitude]}
        interactive={false}
        icon={myIcon}
      />
    ) : null;
  };

  const guessed = () => {
    console.log(fullAddress.length);
    console.log(fullAddress);
    if (fullAddress.length === 5) {
      console.log("Location was not entered");
    } else {
      console.log(id);

      const errorDist = getDistance(
        { latitude: position.latitude, longitude: position.longitude },
        {
          latitude: positionLocation.latitude,
          longitude: positionLocation.longitude,
        }
      );
      console.log(errorDist);
      axios
        .post(
          process.env.REACT_APP_BACKEND_SERVER_URL + "guess/create",
          {
            locationId: id,
            longtitude: position.longitude,
            latitude: position.latitude,
            meters: errorDist,
          },
          { headers }
        )
        .then((response) => {
          console.log("uploaded image");
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response);
        });
      setErrorResponse(errorDist.toString() + " meters");
      setLeaderboardKey(leaderboardKey + 1);
    }
  };

  useEffect(() => {
    if (userId === "false") {
      navigate("/");
    }

    axios
      .get(
        process.env.REACT_APP_BACKEND_SERVER_URL + "location/location-id/" + id,
        {
          headers,
        }
      )
      .then((response) => {
        console.log(response.data);
        setImage(response.data.image);
        setPositionLocation({
          latitude: response.data.latitude,
          longitude: response.data.longtitude,
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
    setFullAddress(
      municipality +
        " " +
        city +
        " " +
        town +
        " " +
        village +
        " " +
        postNumber +
        " " +
        country
    );
  }, [
    municipality,
    city,
    town,
    village,
    postNumber,
    country,
    errorResponse,
    userId,
  ]);
  return (
    <div className="location-container">
      <div className="location-left">
        <h4>
          Take a <span>guess</span>!
        </h4>
        <img src={image} alt="location"></img>
        <div className="leaflet-map-div">
          <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
          </MapContainer>
        </div>
        <div className="guessed-data-div">
          <p>{}</p>
          <div className="upper-part">
            <div className="error-distance">
              <p className="label">Error distance</p>
              <p className="display">{errorResponse}</p>
            </div>
            <div className="guessed-location">
              <p className="label">Guessed location</p>
              <p className="display">{fullAddress}</p>
            </div>
          </div>
          <div className="submit-div">
            <button onClick={() => guessed()} type="button">
              GUESS
            </button>
          </div>
        </div>
      </div>
      <div className="leaderboard-div">
        <h4>Leaderboard</h4>
        <div className="leaderboard-list">
          <Leaderboard key={leaderboardKey}></Leaderboard>
        </div>
      </div>
    </div>
  );
}
