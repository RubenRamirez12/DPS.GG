import OsuSidebar from "./OsuSidebar";
import "./OsuMain.css"
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";
import {thunkGetUser} from "../../store/Osu"
import { useEffect } from "react";

export default function OsuMain() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const tempUserSearch = (username) => {
        dispatch(thunkGetUser(username));
    }

    useEffect(() => {

    })

    return (
        <div className="osu-main__main">
            <div className="osu-main__sidebar">
                <OsuSidebar/>
            </div>
            <div className="osu-main__content">
                <input type="text" placeholder="Enter Username"/>
            </div>
        </div>
    )
}
