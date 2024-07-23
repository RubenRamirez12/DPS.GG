import { Link } from "react-router-dom";
import "./Navbar.css";
export default function Navbar() {
  return (
    <div className="navbar__main">
      <Link to="/lol">Leaugue of Legends</Link>
        <Link to="/osu">osu!</Link>
    </div>
  );
}
