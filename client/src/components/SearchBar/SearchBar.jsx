import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

export default function SearchBar({ searchBarData }) {
  const [searchVal, setSearchVal] = useState("");

  const handleKey = (e) => {
    if (e.key === "Enter") {
      searchBarData.handleSearch(e, searchVal);
    }
  };

  return (
    <div
      className="search-bar__div"
      style={{ backgroundImage: searchBarData.Image }}
    >
      <div className="search-bar__description">
        <h1>DPS.GG</h1>
      </div>

      <form
        onSubmit={(e) => searchBarData.handleSearch(e, searchVal)}
        className="search-bar__form"
      >
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
