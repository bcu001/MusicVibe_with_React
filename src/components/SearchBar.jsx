import React, { useState } from "react";

const SearchBar = ({ onSearch, setLoading }) => {
  const [searchText, setSearchText] = useState("");
  const jamendoClientId = import.meta.env.VITE_jamendoClientId;

  const handlerChange = (e) => {
    setSearchText(e.target.value);
  };

  async function getSongs(songListLength = 12) {
    try {
      setLoading(true);
      if (searchText === "") {
        throw new Error("No Search Input");
      }

      const response = await fetch(
        `https://api.jamendo.com/v3.0/tracks/?client_id=${jamendoClientId}&format=json&limit=${songListLength}&search=${encodeURIComponent(
          searchText
        )}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (data.results.length === 0) {
        throw new Error("No Results from Search Input");
      }
      onSearch(data.results);
      setSearchText("");
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      return false;
    } finally {
      setLoading(false);
    }
  }

  const handlerKeyDown = (e) => {
    if (e.key === "Enter") {
      getSongs();
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <input
          className="outline-none p-1 m-2 bg-[#e0dddd] rounded-md"
          type="search"
          name="searchBar"
          value={searchText}
          onChange={(e) => {
            handlerChange(e);
          }}
          onKeyDown={handlerKeyDown}
          id="searchBar"
          placeholder="Enter song name"
        />
        <button
          className="bg-green-500 p-1 mx-2 active:bg-green-600 rounded-md text-white font-bold"
          id="searchBtn"
          onClick={() => {
            getSongs();
          }}
        >
          Search
        </button>
      </div>
    </>
  );
};

export default SearchBar;
