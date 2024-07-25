import { NavLink } from "react-router-dom";
import "./Navbar.css";
import LeagueOfLegendsIcon from "../../assets/LeagueOfLegendsIcon.png";
import OsuIcon from "../../assets/OsuIcon.png";

export default function Navbar() {
  return (
    <div className="navbar__main">
      <NavLink className="navbar__link" to="/lol" activeClassName="active">
        <img className="navbar__icon" src={LeagueOfLegendsIcon} alt="" />
        <div className="navbar__text">Leaugue of Legends</div>
      </NavLink>
      <NavLink className="navbar__link" to="/osu" activeClassName="active">
        <img className="navbar__icon" src={OsuIcon} alt="" />
        <div className="navbar__text">Osu!</div>
      </NavLink>
    </div>
  );
}

// auth button -> obtaining private user details
