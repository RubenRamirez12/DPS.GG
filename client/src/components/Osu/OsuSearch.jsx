import { useState } from "react";
import "./OsuSearch.css";
import { thunkGetUser } from "../../store/Osu.js";
import { useDispatch} from "react-redux"

export default function OsuSearch() {
    const dispatch = useDispatch()
    const [searchVal, setSearchVal] = useState("")

    const handleKey = (e) => {
        if(e.key === "Enter"){
            handleSearch(e)
        }
    }

    const handleSearch = (e) => {
        e.preventDefault()
        dispatch(thunkGetUser(searchVal, 0))
    }
  return (
    <div className="osu-search__div">
      <div className="osu-search__description">
        <h1>DPS.GG</h1>
        <div className="osu-search__description-info">
          <h2>Stat track yourself</h2>
          <h2>tier list </h2>
        </div>
      </div>
      <form onSubmit={handleSearch}>
      <input
        className="osu-search__input"
        type="text"
        value={searchVal}
        onKeyDown={handleKey}
        onChange= {(e) => setSearchVal(e.target.val)}
        placeholder="Search Yourself"
        required
      />
      <button type="submit">submit</button>
      </form>
    </div>
  );
}
