import React, { useState } from "react";
import careNearLogo from "./../../assets/logos/careNearLogo.png";
import "./../../css/background.css";
const Navbar = () => {
  const [isHamNav, setIsHamNav] = useState(false);
  

  return (
    <div className="flex fixed w-full justify-around  p-2 py-4 nav_bg  items-center ">
      <div>
        {/* <img src={careNearLogo} alt="care-near logo" 
        className="w-12"/> */}
        <div className="font-bold text-3xl text-cyan-500">CareNear</div>
      </div>

      <div className="nav_options hidden md:flex">
        <ul className="flex flex-col md:flex-row justify-between gap-10">
          <li className="bg-white/60 p-1 rounded-md">Find Doctors</li>
          <li className="bg-white/60 p-1 rounded-md">FInd Pharmacies</li>
          <li className="bg-white/60 p-1 rounded-md">Doctor Login</li>
          <li className="bg-white/60 p-1 rounded-md">Pharmacy Login</li>
        </ul>
      </div>

      <div>
        <div className="theme_modes">
          <i className="fa-regular fa-sun"></i>{" "}
        </div>
        <div className="hamburger md:hidden">
          <i className="fa-solid fa-bars"></i>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
