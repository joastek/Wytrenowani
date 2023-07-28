"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import bgColor from "../../../public/Footer.png";
import switchOn from "../../../public/SwitchON.png";
import switchOff from "../../../public/SwitchOff.png";
import sunIcon from "../../../public/sun.png";
import moonIcon from "../../../public/moon.png";
import Switch from "@mui/material/Switch";
const Navigation = () => {
  const [switcherLang, setSwitcherLang] = useState(false);
  const [switcherThem, setSwitcherThem] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  const handleSwitchLang = () => {
    setSwitcherLang(!switcherLang);
    setTheme(switcherThem ? "light" : "dark");
  };
  const handleSwitchThem = () => {
    setSwitcherThem(!switcherThem);
    setTheme(switcherThem ? "light" : "dark");
  };

  return (
    <>
      <div className=" w -screen absolute right-0 ">
        {/* <Image
          src={bgColor}
          alt="tło"
          className="w-full -top-8  z-20 absolute"
        /> */}
        <div className="  text-white  flex justify-end  space-x-0.5 self-end">
          <div className="flex p-6 z-40">
            {" "}
            PL
            <Image
              src={switcherLang ? switchOn : switchOff}
              alt="switcher"
              onClick={handleSwitchLang}
            />
            EN
          </div>
          <div className="flex p-6 z-40">
            {" "}
            <Image src={sunIcon} alt="sun" />
            <Switch onChange={handleSwitchThem} color="secondary" />
            <Image src={moonIcon} alt="moon" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
