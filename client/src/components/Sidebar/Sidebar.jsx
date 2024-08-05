import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import { FaBars } from "react-icons/fa";

export default function Sidebar({ sidebarData }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="sidebar__main"
      style={{ width: isExpanded ? "275px" : "50px" }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}>
      <div className="sidebar__top">
        <div className="sidebar__top-logo">
          <FaBars />
        </div>
        <h1
          className="sidebar__top-name"
          style={{ display: isExpanded ? "block" : "none" }}>
          DPS.GG
        </h1>
      </div>
      {sidebarData.map((item, index) => {
        return (
          <NavLink to={item.path} className="sidebar__link" key={index}>
            <div className="sidebar__link-icon">{item.icon}</div>
            <div
              className="sidebar__link-name"
              style={{ display: isExpanded ? "block" : "none" }}>
              {item.name}
            </div>
          </NavLink>
        );
      })}
    </div>
  );
}
