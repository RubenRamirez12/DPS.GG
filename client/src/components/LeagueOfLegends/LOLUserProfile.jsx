import { useDispatch, useSelector } from "react-redux";
import "./LOLUserProfile.css";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { actionClearUser, thunkGetUser } from "../../store/LeagueOfLegends";

export default function LOLUserProfile() {
  let dispatch = useDispatch();
  let { riotID } = useParams();
  let user = useSelector((state) => state.LeagueOfLegends.currentUser);
  let loading = useSelector((state) => state.LeagueOfLegends.loading);
  let error = useSelector((state) => state.LeagueOfLegends.error);

  useEffect(() => {
    dispatch(thunkGetUser(riotID));

    return () => {
      dispatch(actionClearUser());
    };
  }, [dispatch]);

  if (loading) {
    return (
      <div className="lol-profile__div">
        <h1>loading!!!!!!!!!!!!!!!!!!!!!</h1>
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
    <div className="lol-user-profile__div">
      <div className="lol-user-profile__user-info-section">
        <div className="lol-user-profile__top">
          <div className="lol-user-profile__display-profile">
            <div className="lol-user-profile__top__top">
              <div className="lol-user-profile__user-level-icon">
                <div className="lol-user-profile__user-level">
                  {user.summonerInfo.summonerLevel}
                </div>
                <div className="lol-user-profile__user-icon">
                  <img
                    className="lol-user-profile__icon-settings"
                    src={user.summonerInfo.profileIconUrl}
                  />
                </div>
              </div>
              <div className="lol-user-profile__username-tagline">
                {" "}
                <h1>
                  {user.summonerInfo.gameName} #{user.summonerInfo.tagLine}
                </h1>
              </div>
            </div>
            <div className="lol-user-profile__top__overview">Overview</div>
          </div>
        </div>
        <div className="lol-user-profile__overview">
          <div className="lol-user-profile__ranked-stats">
            <div className="lol-user-proflie__ranked-solo">Ranked Solo</div>
            <div className="lol-user-proflie__ranked-flex">Ranked flex</div>
          </div>
          <div className="lol-user-profile__match-history">2</div>
        </div>
      </div>
    </div>
  );
}

//<h1>{user.summonerInfo.gameName} #{user.summonerInfo.tagLine}</h1>
