"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import bgColor from "../../../public/Footer.png";
import switchOn from "../../../public/SwitchON.png";
import switchOff from "../../../public/SwitchOff.png";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import LightModeIcon from "@mui/icons-material/LightMode";
import FormGroup from "@mui/material/FormGroup";
const Navigation = () => {
  const [switcherLang, setSwitcherLang] = useState(false);
  const [switcherThem, setSwitcherThem] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  // const handleSwitchLang = () => {
  //   setSwitcherLang(!switcherLang);
  //   setTheme(switcherThem ? "light" : "dark");
  // };
  const handleSwitchThem = () => {
    const newSwitcherThem = switcherThem;
    setSwitcherThem(!newSwitcherThem);

    // Oczekuj, aż stan switcherThem zostanie zaktualizowany, a następnie ustaw theme
    setTimeout(() => {
      setTheme(newSwitcherThem ? "light" : "dark");
    }, 0);
  };

  return (
    <>
      <div className=" w -screen  flex items-center">
        {/* <Image
          src={bgColor}
          alt="tło"
          className="w-full -top-8  z-20 absolute"
        /> */}
        <div className="  text-white   flex">
          <div className="flex items-center justify-center  p-2 my-4 mr-2 z-40 bg-bar rounded-[2rem] drop-shadow-2xl w-[8rem]">
            {" "}
            <p className="text-[0.8rem]"> PL</p>
            <Switch color="secondary" />
            <p className="text-[0.8rem]">EN</p>
          </div>

          <div className="flex items-center justify-center  p-2 my-4 mr-2 z-40 bg-bar rounded-[2rem] drop-shadow-2xl w-[8rem]">
            {" "}
            <LightModeIcon className="w-8" />
            <Switch color="secondary" onChange={handleSwitchThem} />
            <ModeNightIcon />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
