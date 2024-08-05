import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function LOLSidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  const menuItems = [
    {
        path: "/tier-list",
        name: "Tier List",
        iconL: "boop"
    }
  ]

  return (
    <div
      className="lol-sidebar__main"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}>
        <NavLink to="/lol">Home</NavLink>
      <ul>
        <li>
          {/* <Icon>Your tier list icon</Icon> */}
          {isExpanded && <span>Tier List</span>}
        </li>
        {/* Other list items */}
      </ul>
    </div>
  );
}
