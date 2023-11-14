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
      <div className="flex text-2xl w-[70rem] ">
        <table className="w-full border-solid border-black ">
          <thead>
            <tr>
              <th>Waga</th>
              <th>Data</th>
              <th>Usuń</th>
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
