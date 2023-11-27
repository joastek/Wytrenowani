import Logo from "../../public/Logo.png";
import Image from "next/image";

import "bulma/css/bulma.css";
import "@/styles/globals.css";
import LoginButtons from "@/components/LoginPage/LoginButtons";
import Navigation from "@/components/LoginPage/Navigation";
export default function Home() {
  return (
    <>
      {" "}
      <div className="container mt-28  p-4">
        <div className=" text-8xl sm:text-5xl flex m-auto justify-center text-center ">
          Wy
          <Image src={Logo} alt="Logo" />
          <div className="text-secondary">ren</div>
          owani
        </div>
        <div className="block text-2xl text-center sm:text-xl">
          Twój trener,dietetyk i notatnik - w jednym
        </div>
        <div
          className="column is-5 m-auto
 bg-bgcontrastpurple  rounded-[1rem] shadow-3xl"
        >
          <LoginButtons />
        </div>
      </div>
    </>
  );
}
