const Card = ({ title, ArtishName, SongCover, id }) => {
  return (
    <div id={id} className="w-[220px] h-[300px] bg-[#e7e3e3] p-2 rounded-lg hover:cursor-pointer hover:bg-[#d3cece]">
      <img
        className="w-[220px] h-[230px] object-cover rounded-lg"
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
