import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import Card from "./components/Card";
import Loading from "./components/Loading";
import Player from "./components/Player";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currSong, setCurrSong] = useState(null);
  const [currAudioSrc, setCurrAudioSrc] = useState("");
  const [currSongCover, setCurrSongCover] = useState("");
  const [isDisplayPlayer, setIsDisplayPlayer] = useState(false);

  const handleSearchData = (searchData) => {
    setData([...searchData]);
  };

  const handleLoading = (value) => {
    setIsLoading(value);
  };

  const getCurrSong = (id) => {
    const c = data.findIndex((s) => {
      return s.id === id;
    });
    setCurrSong(c);
    setCurrAudioSrc(data[c].audio);
    setCurrSongCover(data[c].album_image);
    setIsDisplayPlayer(true);
    console.log("jamendo");
  };

  const getCurrSongItunes = (id) => {
    const c = data.findIndex((s) => {
      return s.trackId === id;
    });
    setCurrSong(c);
    setCurrAudioSrc(data[c].previewUrl);
    setCurrSongCover(data[c].artworkUrl100);
    setIsDisplayPlayer(true);
  };

  return (
    <div className="w-screen h-screen flex flex-col">
      <Navbar />
      <SearchBar onSearch={handleSearchData} setLoading={handleLoading} />
      <div
        className={`flex-grow relative w-auto mt-5  flex gap-16 flex-wrap justify-center overflow-auto  ${
          isLoading ? "items-center" : ""
        }  p-2`}
        id="songList"
      >
        {isLoading ? (
          <Loading />
        ) : (
          data.map((s) => {
            return (
              <Card
                id={s.trackId}
                SongCover={s.artworkUrl100}
                title={s.trackCensoredName || "Unknown Name"}
                ArtishName={s.artistName || "Unknown Artist"}
                key={uuidv4()}
                getId={getCurrSongItunes}
              />
            );
          })
        )}
        <Player
          audioScr={currAudioSrc}
          songCover={currSongCover}
          isDisplay={isDisplayPlayer}
          setIsDisplay={setIsDisplayPlayer}
        />
      </div>
    </div>
  );
}

export default App;
