"use client"
import React from "react";
import { RootState } from "@/types/type";
import { useSelector } from "react-redux";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
const ProteinBar = () => {
  const { totalProtein, totalCarbo, totalFat, totalCalories } = useSelector(
    (state: any) => state.nutriensSum
  );
  const { calories, result, mass } = useSelector(
    (state: RootState) => state.bmiCalculator
  );
  const Protein = Math.ceil(1.8 * mass);
  const percentage = 66;
  return (
    <div>
      {" "}
      <CircularProgressbar
        value={totalProtein}
        maxValue={Protein}
        text={` \n ${totalProtein}/${Protein} kcal`}
        styles={buildStyles({
          textColor: "white",
          textSize: "0.6rem",
          pathColor: `rgb(18, 113, 255, ${percentage / 100}`,
        })}
      />{" "}
    </div>
  );
};

export default ProteinBar;
