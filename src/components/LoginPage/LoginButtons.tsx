import Link from "next/link";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const LoginButtons = () => {
  return (
    <>
      {" "}
      <div className="w-full flex p-16 flex-col justify-center items-center">
        <div className=" m-6">
          <Button variant="outlined" className="cursor-not-allowed m-6">
            Zaloguj się
          </Button>
          <Button variant="outlined" className="cursor-not-allowed m-6">
            Zarejestruj się
          </Button>
        </div>
        <div>
          {" "}
          <Link href="/dashboard">
            {" "}
            <Button
              variant="outlined"
              className="m-auto  place-items-center text-white bg-gradient-to-br from-secondary to-third  font-light rounded-lg text-lg px-5 py-2.5 text-center "
            >
              Zaloguj jako gość
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default LoginButtons;
