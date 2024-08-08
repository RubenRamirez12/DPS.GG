import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function SearchBar({ searchBarData }) {
  const [searchVal, setSearchVal] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleKey = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    let redirect = await dispatch(searchBarData.searchThunk(searchVal));

    if (redirect) {
      navigate(`${searchBarData.redirectURL}/${searchVal}`);
    }
  };

  return (
    <div
      className="search-bar__div"
      style={{ backgroundImage: `url(${searchBarData.image})` }}
    >
      <div className="search-bar__description">
        <h1>DPS.GG</h1>
      </div>

      <form onSubmit={handleSearch} className="search-bar__form">
        <input
          className="search-bar__input"
          type="text"
          value={searchVal}
          onKeyDown={handleKey}
          onChange={(e) => setSearchVal(e.target.value)}
          placeholder={searchBarData.placeHolder}
          required
        />
        <button type="submit" className="search-bar__search-button">
          <FaSearch />
        </button>
      </form>
    </div>
  );
}
