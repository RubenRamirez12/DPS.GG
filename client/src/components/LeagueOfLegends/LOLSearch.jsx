import { useState } from "react";
import "./LOLSearch.css";
import { useDispatch } from "react-redux";
import { thunkGetUser } from "../../store/LeagueOfLegends";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom"

export default function LOLSearch() {
  const [searchVal, setSearchVal] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate()
  console.log(searchVal);

  const handleKey = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    let redirect = await dispatch(thunkGetUser(searchVal));

    if (redirect) {
      navigate(`/lol/user/${searchVal}`)
    }
  };

  return (
    <div className="lol-search__div">
      <div className="lol-search__description">
        <h1>DPS.GG</h1>
        {/* <div className="lol-search__description-info">
          <span>Statrack yourself</span>
          <span>tier list </span>
        </div> */}
      </div>
      <form onSubmit={handleSearch} className="lol-search__form">
        <input
          className="lol-search__input"
          type="text"
          value={searchVal}
          onKeyDown={handleKey}
          onChange={(e) => setSearchVal(e.target.value)}
          placeholder="Search Yourself"
          required
        />
        <button type="submit" className="lol-search__search-button">
          <FaSearch />
        </button>
      </form>
    </div>
  );
}
