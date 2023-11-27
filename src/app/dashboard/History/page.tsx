import React from "react";

import getWeight from "@/actions/getWeight";
import { PageContent } from "./components/PageFileComponent";
import Chart from "@/components/Dashboard/Chart";

export const revalidate = 0;

const History = async () => {
  const weight = await getWeight();
  return (
    <div className="container text-white mt-24">
      <div className="bg-bar rounded-2xl p-12 m-12">
        <p className="text-6xl flex justify-center text-center pb-4">
          {" "}
          Historia wagi
        </p>
        <PageContent weight={weight} />
      </div>

      <div className="bg-bar rounded-2xl p-12 mx-12">
        {" "}
        <Chart weight={weight} />
      </div>
    </div>
  );
};

export default History;
