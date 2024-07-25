import OsuSidebar from "./OsuSidebar";
import "./OsuMain.css"
import { useNavigate } from "react-router-dom";

export default function OsuMain() {
    const navigate = useNavigate();

    // const search = async () => {

    // }
    return (
        <div className="osu-main__main">
            <div className="osu-main__sidebar">
                <OsuSidebar/>
            </div>
            <div className="osu-main__content">
                <button onClick={handleAuth}>Obtain Osu Stats</button>
            </div>
        </div>
    )
}
