import { useState } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import Card from "./components/Card";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [data, setData] = useState([]);

  const handleSearchData = (searchData) => {
    setData([...searchData]);
  };

  const show = (s) => {
    console.log(s);
  };

  return (
    <div className="w-screen h-screen">
      <Navbar />
      <SearchBar onSearch={handleSearchData} />

      <div
        className="w-auto h-[75%] mt-5  flex gap-16 flex-wrap justify-center overflow-auto border-black border"
        id="songList"
      >
        {data.map((s) => {
          return (
            <Card
              id={s.id}
              SongCover={s.album_image}
              title={s.name}
              ArtishName={s.artist_name}
              key={uuidv4()}
            />
          );
        })}
          <div></div>
      </div>
    </div>
  );
}

export default App;
