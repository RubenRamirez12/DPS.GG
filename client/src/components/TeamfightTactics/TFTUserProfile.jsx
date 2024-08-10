import { useSelector } from "react-redux";
import "./TFTUserProfile.css";

export default function TFTUserProfile() {
  let user = useSelector((state) => state.TeamFightTactics.currentUser);
  console.log(user);
  if (!user.summonerInfo) {
    return (
      <div className="tft-profile__div">
        <h1>totally ripped</h1>
      </div>
    );
  }
  return (
    <div className="tft-user-profile__div">
      <h1>WE MADE IT</h1>
    </div>
  );
}
