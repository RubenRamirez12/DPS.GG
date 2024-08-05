import OsuSidebar from "./OsuSidebar";
import "./OsuMain.css"

export default function OsuMain() {

    return (
        <div className="osu-main__main">
            <div className="osu-main__sidebar">
                <OsuSidebar/>
            </div>
            <div className="osu-main__content">
                <button >Obtain Osu Stats</button>
            </div>
        </div>
    )
}
