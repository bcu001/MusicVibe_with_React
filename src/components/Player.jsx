import { useRef, useState, useEffect, useContext } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { IoPlayBackSharp, IoPlayForward } from "react-icons/io5";
import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";

const Player = ({
  audioScr,
  songCover,
  isDisplay,
  setIsDisplay,
  nextSongPlay,
  prevSongPlay,
}) => {
  const AudioRef = useRef(null);
  const [currSongPlaying, setCurrSongPlaying] = useState(false);

  const handlePlayAudio = () => {
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

  const handleShow = () => {
    setIsDisplay(true);
  };

  return (
    <div
      className={` fixed h-[470px] w-screen flex items-center justify-center ${
        isDisplay
          ? ""
          : "h-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      } transition-all duration-500 ${songCover || "hidden"}`}
    >
      <div
        className={`bg-[#00000060] h-[140px] w-[330px] rounded-xl flex ${
          isDisplay ? "" : "-left-40"
        } gap-10 transition-transform duration-1000 items-center backdrop-blur-sm justify-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
      >
        <div
          className={`${
            currSongPlaying ? "bg-green-500 " : "bg-gray-500"
          } rounded-full relative transition-all duration-500`}
        >
          <img
            className="h-[120px] w-[120px] object-contain rounded-full p-2 "
            src={
              songCover ||
              "https://imgs.search.brave.com/nlIOwq3RJmKdmT5vfHXUE2CqVsj85twC6BpOdukaBLU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2ZhLzhh/LzVlL2ZhOGE1ZTk2/Yjg5YTdjMTBmYWM4/Nzk2NTg2OTRlYWM3/LmpwZw"
            }
            alt="Song-cover"
          />
          {/* <div className="bg-green-500 h-[15px] w-[15px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full"></div> */}
        </div>

        <div className="btns flex justify-center gap-5">
          <button className="p-1" onClick={prevSongPlay}>
            <IoPlayBackSharp color="white" size={25} />
          </button>
          <button className="p-1" onClick={handlePlayAudio}>
            {currSongPlaying ? (
              <FaPause color="white" />
            ) : (
              <FaPlay color="white" />
            )}
          </button>
          <button className="p-1" onClick={nextSongPlay}>
            <IoPlayForward color="white" size={25} />
          </button>
        </div>
        <audio loop ref={AudioRef} src={audioScr}></audio>
        <button
          onClick={handleClose}
          className=" absolute top-1 -right-1 w-10 hover:animate-spin justify-center hidden"
        >
          <IoIosClose size={30} color="white" />
        </button>
        <button
          onClick={isDisplay ? handleClose : handleShow}
          className={`absolute ${isDisplay ? "-left-12" : "-right-12"}`}
        >
          {isDisplay ? (
            <RxDoubleArrowLeft color="white" size={50} />
          ) : (
            <RxDoubleArrowRight color="white" size={50} />
          )}
        </button>
      </div>
    </div>
  );
};

export default Player;
