import { useRef, useState, useEffect, useContext } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";

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
      className={`bg-[#00000060] h-[200px] w-[170px] rounded-md overflow-hidden fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
        isDisplay ? "flex" : "hidden"
      } transition-transform duration-500 items-center flex-col py-5 backdrop-blur-sm`}
    >
      <img
        className="h-[120px] w-[120px] object-contain rounded-md
        p-2"
        src={
          songCover ||
          "https://imgs.search.brave.com/nlIOwq3RJmKdmT5vfHXUE2CqVsj85twC6BpOdukaBLU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2ZhLzhh/LzVlL2ZhOGE1ZTk2/Yjg5YTdjMTBmYWM4/Nzk2NTg2OTRlYWM3/LmpwZw"
        }
        alt="Song-cover"
      />

      <div className="btns flex justify-center">
        <button className="p-1" onClick={handleAudio}>
          {currSongPlaying ? (
            <FaPause color="white" />
          ) : (
            <FaPlay color="white" />
          )}
        </button>
      </div>
      <audio loop ref={AudioRef} src={audioScr}></audio>
      <button
        onClick={handleClose}
        className=" absolute top-0 -right-2 w-10 rounded-full "
      >
        <IoIosClose size={30} color="white" />
      </button>
    </div>
  );
};

export default Player;
