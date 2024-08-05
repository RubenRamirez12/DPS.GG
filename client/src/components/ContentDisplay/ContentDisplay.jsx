import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import "./ContentDisplay.css";

export default function ContentDisplay({ sidebarData }) {
  return (
    <div className="content-display__div">
      <div className="content-display__sidebar">
        <Sidebar sidebarData={sidebarData} />
      </div>
      <div className="content-display__main">
        <Outlet />
      </div>
    </div>
  );
}
