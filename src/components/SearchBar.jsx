import React, { useState } from "react";

const SearchBar = ({ onSearch, setLoading, setTotalSongs }) => {
  const [searchText, setSearchText] = useState("");
  const jamendoClientId = import.meta.env.VITE_jamendoClientId;

  const handlerChange = (e) => {
    setSearchText(e.target.value);
  };

  async function getSongsItunes(songListLength = 20) {
    const query = searchText.trim();

    if (!query) {
      console.error("No Search Input");
      return;
    }

    try {
      setLoading(true);

      const url = new URL("https://itunes.apple.com/search");
      url.searchParams.set("term", query);
      url.searchParams.set("media", "music");
      url.searchParams.set("entity", "song");
      url.searchParams.set("country", "us");
      url.searchParams.set("limit", String(songListLength));

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`iTunes API error: ${response.status}`);
      }

      const data = await response.json();

      // Normalize iTunes results to Jamendo-compatible fields.
      const songs = data.results.map((song) => ({
        ...song,
        id: song.trackId,
        name: song.trackName,
        artist_name: song.artistName,
        album_name: song.collectionName,
        album_image: song.artworkUrl100,
        image: song.artworkUrl100,
        audio: song.previewUrl,
        duration: song.trackTimeMillis
          ? Math.floor(song.trackTimeMillis / 1000)
          : 0,
        source: "itunes",
      }));

      onSearch(songs);
      setTotalSongs(songs.length);
      setSearchText("");
    } catch (error) {
      console.error("iTunes song search failed:", error);
      onSearch([]);
      setTotalSongs(0);
    } finally {
      setLoading(false);
    }
  }

  async function getSongs(songListLength = 12) {
    const query = searchText.trim();

    if (!query) {
      console.error("No Search Input");
      return;
    }

    try {
      setLoading(true);

      const url = new URL("https://api.jamendo.com/v3.0/tracks/");
      url.searchParams.set("client_id", jamendoClientId);
      url.searchParams.set("format", "json");
      url.searchParams.set("limit", String(songListLength));
      url.searchParams.set("search", query);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Jamendo API error: ${response.status}`);
      }

      const data = await response.json();

      if (!data.results?.length) {
        onSearch([]);
        setTotalSongs(0);
        return;
      }

      onSearch(data.results);
      setTotalSongs(data.results.length);
      setSearchText("");
    } catch (error) {
      console.error("Jamendo song search failed:", error);
      onSearch([]);
      setTotalSongs(0);
    } finally {
      setLoading(false);
    }
  }

  const handlerKeyDown = (e) => {
    if (e.key === "Enter") {
      getSongsItunes();
    }
  };

  return (
    <div className="flex flex-col">
      <input
        className="outline-none p-1 m-2 bg-[#e0dddd] rounded-md"
        type="search"
        name="searchBar"
        value={searchText}
        onChange={handlerChange}
        onKeyDown={handlerKeyDown}
        id="searchBar"
        placeholder="Enter song name"
      />

      <button
        className="bg-green-500 p-1 mx-2 active:bg-green-600 rounded-md text-white font-bold"
        id="searchBtn"
        onClick={() => getSongsItunes()}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
