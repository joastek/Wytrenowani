"use client";
import React from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
  CircularProgressbar,
} from "react-circular-progressbar";
import { useSelector } from "react-redux";
import { RootState } from "@/types/type";
const CaloriesBar = () => {
  const { totalProtein, totalCarbo, totalFat, totalCalories } = useSelector(
    (state: any) => state.nutriensSum
  );
  const { calories, result, mass } = useSelector(
    (state: RootState) => state.bmiCalculator
  );
  return (
    <div className=" ">
      {" "}
      <CircularProgressbar
        value={totalCalories}
        maxValue={calories}
        text={`  ${totalCalories}/${calories} kcal`}
        className="p-6 max-w-[20rem] max-h-[16rem] "
        styles={buildStyles({
          textColor: "white",
          textSize: "0.7rem",
          pathColor: "#EDB90C",
          trailColor: "#000",
        })}
      />
    </div>
  );
};

export default CaloriesBar;
