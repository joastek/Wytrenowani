import React from "react";

import getWeight from "@/actions/getWeight";
import PageFileCompoennt from "./components/PageFileCompoennt";
import Results from "./components/Results";
const Targets = async () => {
  const weight = await getWeight();
  return (
    <>
      <div className="container overflow-y-auto h-screen is-fluid ">
        <div className=" max-w-[60rem] mx-auto">
          <div className=" justify-center rounded-[1rem] border-4 border-contrast shadow-3xl p-6 mt-28  sm:mx-6 ">
            <h1 className="text-[2rem]">
              Podaj swoją wagę, wzrost, wiek, płeć oraz określ poziom aktywności
            </h1>
            <h2 className="text-[1rem]">
              Potrzebujemy tych informacji aby obliczyć twój poziom tkankę
              tłuszczową oraz całkowitą przemianę materii{" "}
            </h2>{" "}
            <PageFileCompoennt />
          </div>
          <Results />
        </div>
      </div>
    </>
  );
};

export default Targets;
