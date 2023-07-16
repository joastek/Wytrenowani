import Link from "next/link";

const LoginButtons = () => {
  return (
    <>
      {" "}
      <div className="w-full flex p-16">
        <button
          type="button"
          style={{ fontFamily: "Ultra" }}
          className="m-auto  place-items-center text-white bg-gradient-to-br from-secondary to-third  font-light rounded-lg text-lg px-5 py-2.5 text-center "
        >
          <Link href="/dashboard"> Zaloguj jako gość </Link>
        </button>
      </div>
    </>
  );
};

export default LoginButtons;
