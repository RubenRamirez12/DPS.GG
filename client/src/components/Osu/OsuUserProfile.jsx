import { useSelector, useDispatch } from "react-redux";
import "./OsuUserProfile.css";
import { useEffect } from "react";
import { actionClearUser, thunkGetUser } from "../../store/Osu";
import { useParams } from "react-router-dom";
import {
  osuJoinDateDisplay,
  osuPlayTimeDisplay,
} from "../../utility/helperFunctions";

export default function OsuUserProfile() {
  const dispatch = useDispatch();
  const { osuUsername } = useParams();
  let user = useSelector((state) => state.Osu.currentUser);
  let loading = useSelector((state) => state.Osu.loading);
  let error = useSelector((state) => state.Osu.error);

  useEffect(() => {
    dispatch(thunkGetUser(osuUsername));

    return () => {
      dispatch(actionClearUser());
    };
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

  console.log(user)
  return (
    <div className="osu-user-profile__div">
      <div className="osu-user-profile__user-info-section">
        <div className="osu-user-profile__user-info-profile">
          <img
            className="osu-user-profile__user-info__pfp"
            src={user.profileIcon}
          />
          <span className="osu-user-profile__user-info__username">
            {user.username}
          </span>
        </div>
        <div className="osu-user-profile__user-info__joindate">
          <span className="osu-user-profile__section-header">
            Account Created
          </span>
          <span className="osu-user-profile__section-info">
            {osuJoinDateDisplay(user.joinDate)}
          </span>
        </div>
        <div className="osu-user-profile__user-info__ranks">
          <div className="osu-user-profile__user-info__ranks__global">
            <span className="osu-user-profile__section-header">
              GLOBAL RANK
            </span>
            <span className="osu-user-profile__section-info">
              {Number(user.ppRank).toLocaleString()}
            </span>
          </div>
          <div className="osu-user-profile__user-info__ranks__country">
            <span className="osu-user-profile__section-header">
              {user.country} RANK
            </span>
            <span className="osu-user-profile__section-info">
              {Number(user.ppCountryRank).toLocaleString()}
            </span>
          </div>
        </div>
        <div className="osu-user-profile__user-info__time-played">
          <span className="osu-user-profile__section-header">TIME PLAYED</span>
          <span className="osu-user-profile__section-info">
            {osuPlayTimeDisplay(user.totalSecondsPlayed)}
          </span>
        </div>
        <div className="osu-user-profile__user-info__level">
          <span className="osu-user-profile__section-header">
            LEVEL {Math.floor(user.level)}
          </span>
        </div>
      </div>

      <div className="osu-user-profile__user-plays">
        <div className="osu-user-profile__user-plays__recent"></div>
        <div className="osu-user-profile__user-plays__best"></div>
      </div>
    </div>
  );
}
