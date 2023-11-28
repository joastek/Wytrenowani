import React from "react";

import getWeight from "@/actions/getWeight";
import { PageContent } from "./components/PageFileComponent";
import Chart from "@/components/Dashboard/Chart";

export const revalidate = 0;

const History = async () => {
  const weight = await getWeight();
  return (
    <div className="container text-white mt-24">
      <div className="bg-bar rounded-2xl p-12 m-12 sm:p-4  border-4 border-contrast  shadow-3xl">
        <p className="text-6xl flex justify-center text-center pb-4">
          {" "}
          Historia wagi
        </p>
        <PageContent weight={weight} />
      </div>

      <div className="bg-bar rounded-2xl p-12  sm:p-4 mx-12  border-4 border-contrast  shadow-3xl">
        {" "}
        <Chart weight={weight} />
      </div>
    </div>
  );
};

export default History;
