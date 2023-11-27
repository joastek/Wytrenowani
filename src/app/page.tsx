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
      <div className="  flex  w-full  text-white  dark:bg-secondary h-screen">
        {/* <div className=" absolute  right-0 top-0   flex justify-center items-center mr-12">
          {" "}
          <Navigation />
        </div> */}

        <div className="container mt-28 ">
          <div className="column text-8xl flex m-auto text-center justify-center">
            Wy
            <Image src={Logo} alt="Logo" />
            <div className="text-secondary">ren</div>
            owani
          </div>
          <div className="block text-2xl text-center">
            Twój trener,dietetyk i notatnik - w jednym
          </div>
          <div
            className="column is-5 m-auto
 bg-bar  rounded-[1rem] shadow-3xl"
          >
            <LoginButtons />
          </div>
        </div>
      </div>
    </>
  );
}
