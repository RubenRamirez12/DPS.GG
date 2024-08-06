import { useState } from "react";
import "./LOLSearch.css";
import { thunkGetUser } from "../../store/LeagueOfLegends";
import { useDispatch } from "react-redux";

export default function LOLSearch() {
  const [searchVal, setSearchVal] = useState("");
  const dispatch = useDispatch()

  const handleKey = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(thunkGetUser(searchVal))
  };
  return (
    <div className="lol-search__div">
      <div className="lol-search__description">
        <h1>DPS.GG</h1>
        <div className="lol-search__description-info">
          <h2>Statrack yourself</h2>
          <h2>tier list </h2>
        </div>
      </div>
      <form onSubmit={handleSearch}>
        <input
          className="lol-search__input"
          type="text"
          value={searchVal}
          onKeyDown={handleKey}
          onChange={(e) => setSearchVal(e.target.value)}
          placeholder="Search Yourself"
          required
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}
