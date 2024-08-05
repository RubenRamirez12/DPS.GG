import LOLSidebar from "./LOLSidebar";
import { Outlet } from "react-router-dom";
import "./LOLMain.css";

export default function LOLMain() {
  return (
    <div className="lol-main__main">
      <div className="lol-main__sidebar">
        <LOLSidebar />
      </div>
      <div className="lol-main__content">
        <Outlet />
      </div>
    </div>
  );
}
