import { useDispatch } from "react-redux";
import "./TFTSearch.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function TFTSearch() {
  const [searchVal, setSearchVal] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(searchVal);

  const handleKey = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    // let redirect = await dispatch(thunkGetUser(searchVal));

    if (redirect) {
      navigate(`/tft/user/${searchVal}`);
    }
  };

  return (
    <div className="tft-search__div">
      <div className="tft-search__desc">
        <h1>DPS.GG</h1>
      </div>
      <form onSubmit={handleSearch} className= "tft-search__form">
        <input
            className="tft-search__input"
            type="text"
            value={searchVal}
            onKeyDOwn={handleKey}
            onChange={(e) => setSearchVal(e.target.value)}
            placeholder="Search"
            required
        />
        <button type="submit" className="tft-search__search-button">
            <FaSearch />
        </button>
      </form>
    </div>
  );
}
