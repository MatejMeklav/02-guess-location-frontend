import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function LocationsList() {
  const [locationsList, setLocationsList] = useState<any[]>([]);
  const [rowCount, setRowCount] = useState<number>(1);
  const [locationClicked, setLocationClicked] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("key"),
    };
    axios
      .get(
        process.env.REACT_APP_BACKEND_SERVER_URL + "location/all-locations",
        {
          headers,
        }
      )
      .then((response) => {
        console.log({ List: response.data });
        setLocationsList(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });

    if (locationClicked !== "") {
      navigate("/location/" + locationClicked);
    }
  }, [rowCount, locationClicked]);
  interface LocationObject {
    id: string;
    image: string;
  }
  var locationsArray = new Array<LocationObject>();

  for (var i = 0; i < locationsList.length; i++) {
    const obj: LocationObject = {
      id: locationsList[i].id,
      image: locationsList[i].image,
    };
    locationsArray.push(obj);
  }
  locationsArray = locationsArray.slice(0, rowCount * 3);

  const itemsList = locationsArray.map((item) => (
    <div
      style={{ backgroundImage: "url(" + item.image + ")" }}
      onClick={() => setLocationClicked(item.id)}
      className="location-item"
      key={item.id}
    ></div>
  ));

  return (
    <>
      <div className="location-list">{itemsList}</div>
      <div className="load-more-div">
        <button type="button" onClick={() => setRowCount(rowCount + 1)}>
          LOAD MORE
        </button>
      </div>
    </>
  );
}
