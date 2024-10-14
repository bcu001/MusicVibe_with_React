import React from "react";
import Theme from "./Theme";
import { FaMusic } from "react-icons/fa6";

const Navbar = () => {
  return (
    <nav className="bg-black text-white navbar">
      <ul className=" p-2 w-screen flex items-center justify-between pr-10">
        <li className="flex items-center gap-2 font-bold text-2xl cursor-pointer">
          <FaMusic color="" />
          MusicVibe
        </li>
        <li>
          <Theme />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
