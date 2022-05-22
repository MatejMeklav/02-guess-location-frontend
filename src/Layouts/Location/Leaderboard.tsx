import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function Leaderboard() {
  const { id } = useParams();
  const [leaderboardArray, setLeaderboardArray] = useState<any[]>([]);

  useEffect(() => {
    console.log(id);
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("key"),
    };
    axios
      .get(
        process.env.REACT_APP_BACKEND_SERVER_URL + "guess/all-guesses/" + id,
        {
          headers,
        }
      )
      .then((response) => {
        setLeaderboardArray(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  function getDifferenceInDays(date1: any, date2: any) {
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs / (1000 * 60 * 60 * 24);
  }

  function getDifferenceInHours(date1: any, date2: any) {
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs / (1000 * 60 * 60);
  }

  function getDifferenceInMinutes(date1: any, date2: any) {
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs / (1000 * 60);
  }

  function getDifferenceInSeconds(date1: any, date2: any) {
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs / 1000;
  }

  interface leaderboardItemObject {
    id: string;
    latitude: number;
    longitude: number;
    meters: number;
    firstName: string;
    lastName: string;
    dateTime: string;
    profileImg: string;
  }

  var leaderboardItemsArray = new Array<leaderboardItemObject>();

  for (var i = 0; i < leaderboardArray.length; i++) {
    var date = new Date(leaderboardArray[i].date_time_with_timezone);

    var dateCalc: string = "";
    var difference: number;

    if (getDifferenceInSeconds(date, Date.now()) < 60) {
      difference = Math.floor(getDifferenceInSeconds(date, Date.now()));
      if (difference === 1) {
        dateCalc = difference + " second ago";
      } else {
        dateCalc = difference + " seconds ago";
      }
    } else if (getDifferenceInMinutes(date, Date.now()) < 60) {
      difference = Math.floor(getDifferenceInMinutes(date, Date.now()));
      if (difference === 1) {
        dateCalc = difference + " min ago";
      } else {
        dateCalc = difference + " mins ago";
      }
    } else if (getDifferenceInHours(date, Date.now()) < 24) {
      difference = Math.floor(getDifferenceInHours(date, Date.now()));
      dateCalc = difference + " hours ago";
    } else {
      dateCalc = date.getDate().toString();
    }

    const obj: leaderboardItemObject = {
      id: leaderboardArray[i].id,
      latitude: leaderboardArray[i].latitude,
      longitude: leaderboardArray[i].longitude,
      meters: leaderboardArray[i].meters,
      firstName: leaderboardArray[i].user.firstName,
      lastName: leaderboardArray[i].user.lastName,
      dateTime: dateCalc,
      profileImg: leaderboardArray[i].user.image,
    };
    leaderboardItemsArray.push(obj);
  }

  leaderboardItemsArray = leaderboardItemsArray.slice(0, 13);
  const itemsList = leaderboardItemsArray.map((item, index) => (
    <div className="upload-item" key={item.id}>
      <div className="user-data">
        <div
          className={
            index + 1 > 3 ? "item-more" : "item-" + (index + 1).toString()
          }
        >
          {index + 1}
        </div>
        <img
          src={
            item.profileImg
              ? item.profileImg
              : require("../Images/ProfileLogo.png")
          }
          alt="profile logo"
        ></img>
        <div className="user-name-date">
          <p className="name-p">
            {item.firstName} {item.lastName}
          </p>
          <p className="date-time-p">{item.dateTime}</p>
        </div>
      </div>
      <p className="meters-display">{item.meters} m</p>
    </div>
  ));
  return <>{itemsList}</>;
}
