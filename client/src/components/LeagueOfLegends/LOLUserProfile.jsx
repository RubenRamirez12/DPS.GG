import { useSelector } from "react-redux";
import "./LOLUserProfile.css";

export default function LOLUserProfile() {
  let user = useSelector((state) => state.LeagueOfLegends.currentUser);
  console.log(user);
  if (!user.summonerInfo) {
    return (
      <div className="lol-profile__div">
        <h1>loading!!!!!!!!!!!!!!!!!!!!!</h1>
      </div>
    );
  }

  return (
    <div className="lol-user-profile__div">
      <div className="lol-user-profile__user-info-section">
        <div className="lol-user-profile__top">
          <div className="lol-user-profile__display-profile">
            <div className="lol-user-profile__top__top">
              <div className="lol-user-profile__user-icon"> icon</div>
              <div className="lol-user-profile__username-tagline"> <h1>{user.summonerInfo.gameName} #{user.summonerInfo.tagLine}</h1></div>
            </div>
            <div className="lol-user-profile__top__bottom">Overview</div>
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
