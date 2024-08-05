import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import { FaBars } from "react-icons/fa";

export default function Sidebar({ sidebarData }) {
  const [isExpanded, setIsExpanded] = useState();

  return (
    <div className="sidebar__main">
      <div className="sidebar__top">
        <h1 className="sidebar__top-name">DPS.GG</h1>
        <div className="sidebar__top-logo">
          <FaBars />
        </div>
      </div>
      {sidebarData.map((option, index) => {
        return (
          <NavLink to={option.path} className="sidebar__link" key={index}>
            <div>{option.icon}</div>
            <div>{option.name}</div>
          </NavLink>
        );
      })}
    </div>
  );
}
