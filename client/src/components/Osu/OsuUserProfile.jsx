import { useSelector, useDispatch } from "react-redux";
import "./OsuUserProfile.css";
import { useEffect } from "react";
import { actionClearUser, thunkGetUser, thunkGetUserRecent } from "../../store/Osu";
import { useParams } from "react-router-dom";
import {
  osuJoinDateDisplay,
  osuPlayTimeDisplay,
} from "../../utility/helperFunctions";
import SSH from "../../assets/osuSSHRank.png"
import SS from "../../assets/osuSSRank.png"
import SH from "../../assets/osuSHRank.png"
import S from "../../assets/osuSRank.png"
import A from "../../assets/osuARank.png"

export default function OsuUserProfile() {
  const dispatch = useDispatch();
  const { osuUsername } = useParams();
  let user = useSelector((state) => state.Osu.currentUser);
  let scores = useSelector((state) => state.Osu.scores);
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
  console.log(osuUsername)
  console.log(scores)
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
        <div className="osu-user-profile__user-plays__more-user-info">
          <div className="osu-user-profile__user-plays__more-user-info__grade-display">
          <div className="osu-user-profile__user-plays__more-user-info__grades">
            <img src={SSH} className="osu-user-profile__user-plays__grade-icon"/>
            <span className="osu-user-profile__user-plays__grade">{user.countRankSSH}</span>
          </div>
          <div className="osu-user-profile__user-plays__more-user-info__grades">
            <img src={SS} className="osu-user-profile__user-plays__grade-icon"/>
            <span className="osu-user-profile__user-plays__grade">{user.countRankSS}</span>
          </div>
          <div className="osu-user-profile__user-plays__more-user-info__grades">
            <img src={SH} className="osu-user-profile__user-plays__grade-icon"/>
            <span className="osu-user-profile__user-plays__grade">{user.countRankSH}</span>
          </div>
          <div className="osu-user-profile__user-plays__more-user-info__grades">
            <img src={S} className="osu-user-profile__user-plays__grade-icon"/>
            <span className="osu-user-profile__user-plays__grade">{user.countRankS}</span>
          </div>
          <div className="osu-user-profile__user-plays__more-user-info__grades">
            <img src={A} className="osu-user-profile__user-plays__grade-icon"/>
            <span className="osu-user-profile__user-plays__grade">{user.countRankA}</span>
          </div>
          </div>
          <span className="osu-user-profile__user-plays__more-user-info__playcount">
            Total Playcount: {user.playcount}
          </span>
        </div>
        <div className="osu-user-profile__user-plays__recent">
          <button onClick={() => {
            dispatch(thunkGetUserRecent(osuUsername))
          }}>USER RECENT TEST</button>
        </div>
        <div className="osu-user-profile__user-plays__best"></div>
      </div>
    </div>
  );
}
