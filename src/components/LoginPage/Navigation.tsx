"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import bgColor from "../../../public/Footer.png";
import switchOn from "../../../public/SwitchON.png";
import switchOff from "../../../public/SwitchOff.png";
import sunIcon from "../../../public/sun.png";
import moonIcon from "../../../public/moon.png";
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
      <div className="  text-white  w-full">
        <Image src={bgColor} alt="tło" className="w-full -top-8 absolute z-0" />
        <div className="z-20 absolute right-32 top-8 text-white  flex text-2xl">
          <div className="flex p-6">
            {" "}
            PL
            <Image
              src={switcherLang ? switchOn : switchOff}
              alt="switcher"
              onClick={handleSwitchLang}
            />
            EN
          </div>
          <div className="flex p-6 ">
            {" "}
            <Image src={sunIcon} alt="sun" />
            <Image
              src={switcherThem ? switchOn : switchOff}
              alt="switcher"
              onClick={handleSwitchThem}
            />
            <Image src={moonIcon} alt="moon" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
