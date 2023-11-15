"use client"
import React from "react";
import { RootState } from "@/types/type";
import { useSelector } from "react-redux";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
const FatBar = () => {
  const { totalFat } = useSelector((state: any) => state.nutriensSum);
  const { mass } = useSelector((state: RootState) => state.bmiCalculator);
  const percentage = 66;
  const Fat = Math.ceil(0.6 * mass);
  return (
    <div>
      {" "}
      <CircularProgressbar
        value={totalFat}
        maxValue={Fat}
        text={` \n ${totalFat}/${Fat} kcal`}
        styles={buildStyles({
          textColor: "white",
          textSize: "0.6rem",
          pathColor: `rgb(200, 50, 50, ${percentage / 100}`,
        })}
      />
    </div>
  );
};

export default FatBar;
