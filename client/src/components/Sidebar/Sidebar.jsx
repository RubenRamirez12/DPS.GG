import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import { FaBars } from "react-icons/fa";

export default function Sidebar({ sidebarData }) {
  return (
    <div className="sidebar__main">
      <div className="sidebar__top">
        <div className="sidebar__top-logo">
          <FaBars />
        </div>
        <span className="sidebar__top-name">DPS.GG</span>
      </div>
      {sidebarData.map((item, index) => {
        return (
          <NavLink to={item.path} className="sidebar__link" key={index} end>
            <i className="sidebar__link-icon">{item.icon}</i>
            <span className="sidebar__link-name">{item.name}</span>
          </NavLink>
        );
      })}
    </div>
  );
}
