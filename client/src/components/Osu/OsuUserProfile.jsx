import { useSelector, useDispatch } from "react-redux";
import "./OsuUserProfile.css";
import { useEffect } from "react";
import { thunkGetUser } from "../../store/Osu";
import { useParams } from "react-router-dom";

export default function OsuUserProfile() {
  const dispatch = useDispatch();
  const { osuUsername } = useParams();
  let user = useSelector((state) => state.Osu.currentUser);

  console.log(user);

  useEffect(() => {
    let currentUser = dispatch(thunkGetUser(osuUsername));
  }, [dispatch]);

  const playTimeDisplay = (totalSecondsPlayed) => {
    const hours = Math.floor(totalSecondsPlayed / (60 * 60));
    const minutes = Math.floor((totalSecondsPlayed % (60 * 60)) / 60);
    const secondsLeft = totalSecondsPlayed % 60;

    const playTime = `${hours}h ${minutes}m ${secondsLeft}s`;
    return playTime;
  }

  const dateFormat = (dateArray) => {
    const year = Number(dateArray[0])
    let month = Number(dateArray[1])
    const day = Number(dateArray[2])
    switch (month) {
        case 1:
            month = "January"
            break
        case 2:
            month = "February"
            break
        case 3:
            month = "March"
            break
        case 4:
            month = "April"
            break
        case 5:
            month = "May"
            break
        case 6:
            month = "June"
            break
        case 7:
            month = "July"
            break
        case 8:
            month = "August"
            break
        case 9:
            month = "September"
            break
        case 10:
            month = "October"
            break
        case 11:
            month = "November"
            break
        case 12:
            month = "December"
    }
    return `${year} ${month} ${day}`
  }

  const joinDateDisplay = (date) => {
    let timeStampArray = date.split(" ")
    let tempDate = timeStampArray[0]
    const timeStamp = timeStampArray[1]
    tempDate = tempDate.split("-")
    const finalDate = dateFormat(tempDate);
    return `${finalDate} at ${timeStamp}`
  }

  if (!user) {
    return (
      <div className="osu-user-profile__div">
        <h1>OSU LOADING</h1>
      </div>
    );
  }

  return (
    <div className="osu-user-profile__div">
      <div className="osu-user-profile__user-info-section">
        <img className="user-info__img" src={user.profileIcon} />
        <h1 className="user-info__username">{user.username}</h1>
        <div className="user-info__joindate">
          <h1>Account Created</h1>
          <h2>{joinDateDisplay(user.join_date)}</h2>
        </div>
        <div className="user-info__ranks">
          <div className="ranks__global">
            <h1>GLOBAL</h1>
            <h2>{Number(user.pp_rank).toLocaleString()}</h2>
          </div>
          <div className="ranks__country">
            <h1>{user.country}</h1>
            <h2>{Number(user.pp_country_rank).toLocaleString()}</h2>
          </div>
        </div>
        <div className="user-info__timePlayed">
          <h1>TIME PLAYED</h1>
          <h2>{playTimeDisplay(user.total_seconds_played)}</h2>
        </div>
        <div className="user-info__level">
          <h1>LEVEL {Math.floor(user.level)}</h1>
        </div>
      </div>
      <div className="osu-user-profile__user-plays"></div>
    </div>
  );
}
