import React from "react";

import getWeight from "@/actions/getWeight";
import { PageContent } from "./components/PageFileComponent";
import Chart from "@/components/Dashboard/Chart";

export const revalidate = 0;

const History = async () => {
  const weight = await getWeight();
  return (
    <div className="container overflow-y-auto h-screen is-fluid ">
      <div className=" max-w-[60rem] mx-auto mt-28">
        <div className="bg-bar rounded-2xl py-y my-12 sm:m-2 sm:p-2  border-4 border-contrast  shadow-3xl">
          <p className="text-6xl flex justify-center text-center p-4 ">
            {" "}
            Historia wagi
          </p>
          <PageContent weight={weight} />
        </div>

        <div className="bg-bar rounded-2xl   sm:p-4   border-4 border-contrast  shadow-3xl">
          {" "}
          <Chart weight={weight} />
        </div>
      </div>
    </div>
  );
};

export default History;
