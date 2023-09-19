import Navigation from "./Navigation";
import Logo from "../../../public/Logo.png";
import Image from "next/image";
import LoginButtons from "./LoginButtons";
const LoginPage = () => {
  return (
    <>
      {" "}
      <div className="  flex  w-full  text-white  dark:bg-secondary h-screen">
        <div className=" absolute  right-0 top-0   flex justify-center items-center mr-12">
          {" "}
          <Navigation />
        </div>

        <div className="m-auto ">
          <div className="text-8xl flex">
            Wy
            <Image src={Logo} alt="Logo" />
            <div className="text-secondary">ren</div>
            owani
          </div>
          <div className="block text-2xl text-center">
            Twój trener,dietetyk i notatnik - w jednym
          </div>
          <LoginButtons />
        </div>
      </div>
    </>
  );
};
export default LoginPage;
