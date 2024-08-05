import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css"

export default function Sidebar({ sidebarData }) {
  const [isExpanded, setIsExpanded] = useState();

  return (
    <div className="sidebar__main">
      <div className="sidebar__top">DPS.GG</div>
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
