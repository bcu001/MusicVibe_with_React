import { useEffect } from "react";

const Card = ({ title, ArtishName, SongCover, id, getId }) => {
  const handleClick = () => {
    getId(id);
  };

  return (
    <div
      onClick={handleClick}
      id={id}
      className="card w-[220px] h-[180px] bg-[#e7e3e3] p-2 rounded-lg hover:cursor-pointer hover:scale-105 transition-transform duration-300" 
    >
      <img
        className="w-[220px] h-[100px] object-contain rounded-lg"
        src={SongCover}
        alt="song-cover"
      />
      <h2 className="font-bold text-xl whitespace-nowrap text-ellipsis overflow-hidden">
        {title}
      </h2>
      <p className="whitespace-nowrap text-ellipsis overflow-hidden">
        {ArtishName}
      </p>
    </div>
  );
};

export default Card;
