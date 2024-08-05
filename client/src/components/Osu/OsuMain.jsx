import OsuSidebar from "./OsuSidebar";
import "./OsuMain.css"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import OsuSearch from "./OsuSearch";

export default function OsuMain() {
    const navigate = useNavigate();

    useEffect(() => {

    })

    return (
        <div className="osu-main__main">
            <div className="osu-main__sidebar">
                <OsuSidebar/>
            </div>
            <div className="osu-main__content">
                <OsuSearch/>
            </div>
        </div>
    )
}
