import { useRef, useState, useEffect, useContext } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

const Player = ({ audioScr, songCover, isDisplay, setIsDisplay }) => {
  const AudioRef = useRef(null);
  const [currSongPlaying, setCurrSongPlaying] = useState(false);

  const handleAudio = () => {
    if (!currSongPlaying) {
      AudioRef.current.play();
    } else {
      AudioRef.current.pause();
    }
    setCurrSongPlaying(!currSongPlaying);
  };

  useEffect(() => {
    if (currSongPlaying && AudioRef.current) {
      AudioRef.current.pause();
      setCurrSongPlaying(false);
    }
  }, [audioScr]);

  const handleClose = () => {
    setIsDisplay(false);
  };

  return (
    <div
      className={`bg-gray-400 border border-red-500 h-[350px] w-[400px] rounded-md overflow-hidden absolute top-10 ${
        isDisplay ? "flex" : "hidden"
      } transition-transform duration-500 flex-col`}
    >
      <img className="h-[70%] w-full object-cover" src={songCover} alt="" />

      <div className="btns flex justify-center">
        <button className="p-1" onClick={handleAudio}>
          {currSongPlaying ? <FaPause /> : <FaPlay />}
        </button>
      </div>
      <audio ref={AudioRef} src={audioScr}></audio>
      <button onClick={handleClose} className="bg-red-600">
        Close
      </button>
    </div>
  );
};

export default Player;
