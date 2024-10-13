import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import Card from "./components/Card";
import Loading from "./components/Loading";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchData = (searchData) => {
    setData([...searchData]);
  };

  const handleLoading = (value)=>{
    setIsLoading(value);
  }

  return (
    <div className="w-screen h-screen">
      <Navbar />
      <SearchBar onSearch={handleSearchData}  setLoading={handleLoading}/>

      <div
        className={`w-auto h-[75%] mt-5  flex gap-16 flex-wrap justify-center overflow-auto border-black border ${
          isLoading ? "items-center" : ""
        }`}
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
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default App;
