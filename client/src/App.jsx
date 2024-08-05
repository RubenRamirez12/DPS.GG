import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="app__div">
      <div className="app__navbar">
        <Navbar />
      </div>
      <div className="app__main">
        <Outlet />
      </div>
    </div>
  );
}
