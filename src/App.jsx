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
    console.log("AAAAAAAAAAAAAAAa");
  };

  return (
    <div className="w-screen h-screen">
      <Navbar />
      <SearchBar onSearch={handleSearchData} setLoading={handleLoading} />
      <div
        className={`relative w-auto h-[75%] mt-5  flex gap-16 flex-wrap justify-center overflow-auto  ${
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
                id={s.id}
                SongCover={s.album_image}
                title={s.name}
                ArtishName={s.artist_name}
                key={uuidv4()}
                getId={getCurrSong}
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
