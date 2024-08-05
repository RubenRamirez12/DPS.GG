import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ navbarData }) {
  return (
    <div className="navbar__main">
      {navbarData.map((item, index) => {
        return (
          <NavLink className="navbar__link" to={item.path} key={index}>
            <img className="navbar__icon" src={item.icon} alt="" />
            <div className="navbar__text">{item.name}</div>
          </NavLink>
        );
      })}
    </div>
  );
}
