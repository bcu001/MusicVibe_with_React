import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-black text-white">
      <ul className="border-2 border-black p-2 w-screen">
        <li className="flex gap-2 font-bold text-2xl cursor-pointer">
          <img width="25" src="/musicVibeLogo.svg" alt="" />
          MusicVibe
          {/* <NavLink to="index.html">MusicVibe</NavLink> */}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
