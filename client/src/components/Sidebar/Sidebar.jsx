import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar({ options }) {
  const [isExpanded, setIsExpanded] = useState();

  return (
    <div className="sidebar__main">
      <div className="sidebar__top">DPS.GG</div>
      {options.map((option, index) => {
        return (
          <NavLink
            to={option.path}
            className="sidebar__link"
            activeClassname="active-sidebar">
            <div>{option.icon}</div>
            <div>{option.name}</div>
          </NavLink>
        );
      })}
    </div>
  );
}
