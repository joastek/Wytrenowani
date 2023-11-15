"use client";
import React from "react";
import { RootState } from "@/types/type";
import { useSelector } from "react-redux";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
const CarboBar = () => {
  const { totalProtein, totalCarbo, totalFat, totalCalories } = useSelector(
    (state: any) => state.nutriensSum
  );
  const { calories, result, mass } = useSelector(
    (state: RootState) => state.bmiCalculator
  );

  const percentage = 66;
  const Protein = Math.ceil(1.8 * mass);
  const Fat = Math.ceil(0.6 * mass);
  const ProteinGrammeToCalories = Protein * 4;
  const FatGrammeToCalories = Fat * 9;
  const Carbo = Math.ceil(
    (calories - ProteinGrammeToCalories - FatGrammeToCalories) / 4
  );
  return (
    <div>
      {" "}
      <CircularProgressbar
        value={totalCarbo}
        maxValue={Carbo}
        text={` \n ${totalCarbo}/${Carbo} kcal`}
        styles={buildStyles({
          textColor: "white",
          textSize: "0.6rem",
          pathColor: `rgb(221, 74, 255, ${percentage / 100}`,
        })}
      />
    </div>
  );
};

export default CarboBar;
