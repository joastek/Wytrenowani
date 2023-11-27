"use client";

import React from "react";
import { Weight } from "@/types/type";

import WeightItem from "@/components/History/WeightItem";
import Chart from "@/components/Dashboard/Chart";
interface PagecontentProps {
  weight: Weight[];
}
export const PageContent: React.FC<PagecontentProps> = ({ weight }) => {
  if (weight.length === 0) {
    return <div> Brak pomiarów wagi</div>;
  }

  return (
    <>
      <div className="container ">
        <table className=" styled-table w-full  rounded-md">
          <thead className=" justify-center text-center bg-contrast  ">
            <tr className="justify-center text-center">
              <th className="text-white  text-2xl ">Waga</th>
              <th className="text-white  text-2xl">Data</th>
              <th className="text-white  text-2xl ">Usuń</th>
            </tr>
          </thead>{" "}
          {weight.map((weightItem) => (
            <WeightItem data={weightItem} key={weightItem.user_id} />
          ))}
        </table>
      </div>
    </>
  );
};
