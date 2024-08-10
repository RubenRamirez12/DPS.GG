import { useSelector, useDispatch } from "react-redux";
import "./OsuUserProfile.css";
import { useEffect } from "react";
import { actionClearUser, thunkGetUser } from "../../store/Osu";
import { useParams } from "react-router-dom";

export default function OsuUserProfile() {
  const dispatch = useDispatch();
  const { osuUsername } = useParams();
  let user = useSelector((state) => state.Osu.currentUser);
  let loading = useSelector((state) => state.Osu.loading);
  let error = useSelector(state => state.Osu.error)

  useEffect(() => {
    dispatch(thunkGetUser(osuUsername))

    return () => {
      dispatch(actionClearUser())
    }
  }, [dispatch]);

  if (loading) {
    return (
      <div className="osu-user-profile__div">
        <h1>OSU LOADING</h1>
      </div>
    );
  }

  if (!loading && error) {
    return (
      <div>
        <h1>404 user is not found</h1>
      </div>
    );
  }

  return (
    <div className="osu-user-profile__div">
      {/* <h1>{user.username}</h1> */}
      <div className="osu-user-profile__user-info-section">
        <img className="user-info__img" src={user.profileIcon} />
        <h1 className="user-info__username">{user.username}</h1>
        <div className="user-info__joindate">
          <h1>Join Date</h1>
          <h2>{user.join_date}</h2>
        </div>
        <div className="user-info__ranks">
          <div className="ranks__global">
            <h1>GLOBAL</h1>
            <h2>{user.pp_rank}</h2>
          </div>
          <div className="ranks__country">
            <h1>{user.country}</h1>
            <h2>{user.pp_country_rank}</h2>
          </div>
        </div>
        <div className="user-info__timePlayed">
          <h1>TIME PLAYED</h1>
          <h2>{user.total_seconds_played}</h2>
        </div>
        <div className="user-info__level">
          <h1>LEVEL {user.level}</h1>
        </div>
      </div>
      <div className="osu-user-profile__user-plays"></div>
    </div>
  );
}
