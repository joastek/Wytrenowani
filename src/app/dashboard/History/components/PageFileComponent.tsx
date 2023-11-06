"use client";

import React from "react";
import { Weight } from "@/types/type";
import WeightItem from "@/components/History/WeightItem";
import deleteWeight from "@/actions/deleteWeight";
interface PagecontentProps {
  weight: Weight[];
  dltWeight: any;
}
export const PageContent: React.FC<PagecontentProps> = ({
  weight,
  dltWeight,
}) => {
  if (weight.length === 0) {
    return <div> Brak pomiarów wagi</div>;
  }
  const handleDeleteWeight = deleteWeight();
  return (
    <>
      {" "}
      <div className="">
        {weight.map((weight) => (
          <>
            <div key={weight.user_id} className="flex text-2xl">
              <div>{weight.weight}</div>

              <button className="ml-4">Delete</button>
            </div>
          </>
        ))}
      </div>
    </>
  );
};
