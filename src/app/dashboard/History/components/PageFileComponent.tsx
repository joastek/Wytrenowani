"use client";

import React from "react";
import { Weight } from "@/types/type";
import WeightItem from "@/components/History/WeightItem";

interface PagecontentProps {
  weight: Weight[];
  dltWeight: any;
}
export const PageContent: React.FC<PagecontentProps> = ({ weight }) => {
  if (weight.length === 0) {
    return <div> Brak pomiarów wagi</div>;
  }

  return (
    <>
      {" "}
      <div className="">
        <>
          <div className="flex text-2xl">
            <table>
              <thead>
                <tr>
                  <th>Waga</th>
                  <th>Data</th>
                </tr>
              </thead>{" "}
              {weight.map((weight) => (
                <tbody className="m-6">
                  <tr key={weight.user_id}>
                    <th>{weight.weight}</th>
                    <th> {weight.date}</th>
                    <button>delete</button>
                  </tr>
                </tbody>
              ))}
            </table>
            <div></div>
            <div></div>
          </div>
        </>
      </div>
    </>
  );
};
