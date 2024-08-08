import { useDispatch } from "react-redux"
import { thunkGetUser as LOLThunkGetUser } from "../store/LeagueOfLegends"



export const lolSearchBarData = {


    handleSearch: async function(e, riotID) {
        let dispatch = useDispatch()
        let navigate = useNavigate()

        e.preventDefault()
        let redirect = await dispatch(LOLThunkGetUser(riotID))

        if (redirect) {
            navigate("/lol/user/riotID")
        }
    },



    placeHolder: "Search Yourself"
}

export const osuSearchBarData = {


    handleSearch: async function(e, osuID) {
        let dispatch = useDispatch()
        let navigate = useNavigate()
        e.preventDefault()
        let redirect = await dispatch(LOLThunkGetUser(osuID))

        if (redirect) {
            navigate("/lol/user/riotID")
        }
    },


    placeHolder: "This is osu Search"
}


export const tftSearchBarData = {
    handleSearch: async function(e, riotID) {
        let dispatch = useDispatch()
        let navigate = useNavigate()
        e.preventDefault()
        let redirect = await dispatch(LOLThunkGetUser(riotID))

        if (redirect) {
            navigate("/lol/user/riotID")
        }
    },
    placeHolder: "This is not osu Search"
}
