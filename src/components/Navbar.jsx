import React, { useEffect, useState } from "react";
import Theme from "./Theme";
import { FaMusic } from "react-icons/fa6";

const Navbar = () => {
  const [themeValue, setThemeValue] = useState(Boolean);
  const getthemeValue = (value)=>{
    setThemeValue(value);
  }
  return (
    <nav className="bg-black text-white navbar">
      <ul className=" p-2 w-screen flex items-center justify-between pr-10">
        <li className="flex items-center gap-2 font-bold text-2xl cursor-pointer">
          <FaMusic color={themeValue ? 'white' : 'black'} />
          MusicVibe
        </li>
        <li>
          <Theme getTheme={getthemeValue}/>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
