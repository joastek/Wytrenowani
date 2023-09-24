"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/types/type";
import { useState, useEffect } from "react";
import Breakfast from "@/components/Food/SetBreakfastMeal";
import Dinner from "@/components/Food/SetDinnerMeal";
import Lunch from "@/components/Food/SetLunchMeal";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Food = () => {
  const { totalProtein, totalCarbo, totalFat, totalCalories } = useSelector(
    (state: any) => state.nutriensSum
  );

  const { calories, result, mass } = useSelector(
    (state: RootState) => state.bmiCalculator
  );

  ///nutriens circles
  const Protein = Math.ceil(1.8 * mass);
  const Fat = Math.ceil(0.6 * mass);
  const ProteinGrammeToCalories = Protein * 4;
  const FatGrammeToCalories = Fat * 9;
  const Carbo = Math.ceil(
    (calories - ProteinGrammeToCalories - FatGrammeToCalories) / 4
  );

  const percentage = 66;

  return (
    <>
      <div className="flex   justify-center flex-row  ">
        <div className="w-1/2 flex  justify-end mt-28  ">
          <table className="   w-full bg-bar rounded-[2rem] max-w-[70rem] max-h-[70rem] ">
            <thead className="">
              <tr className="flex m-6 p-4 rounded-[2rem] border-[0.4rem] border-secondary text-lg ">
                <th style={{ width: "40%" }} className="font-light">
                  <h2>Produkt</h2>
                </th>
                <th style={{ width: "15%" }} className="font-light">
                  <h2>Białko</h2>
                </th>
                <th style={{ width: "20%" }} className="font-light">
                  <h2>Węglowoadny</h2>
                </th>
                <th style={{ width: "15%" }} className="font-light">
                  <h2>Tłuszcze</h2>
                </th>
                <th style={{ width: "15%" }} className="font-light">
                  <h2>Kcal</h2>
                </th>
              </tr>
            </thead>

            <tbody>
              <div className=" overflow-y-auto border-[0.4rem] border-secondary  h-[60rem]  p-4 m-6 rounded-[2rem]">
                <Breakfast />
                <Dinner />
                <Lunch />
              </div>
            </tbody>
          </table>
        </div>

        <div className="block  w-1/2    mt-28   rounded-lg ml-6 max-h-[70rem] max-w-[30rem]">
          <div className="w-1/2 flex flex-col h-1/3 items-center bg-bar p-6 mr-5    rounded-[2rem]">
            <h3 className="mb-4">Suma kcal :</h3>
            <CircularProgressbar
              value={totalCalories}
              maxValue={calories}
              text={` \n ${totalCalories}/${calories} kcal`}
              styles={buildStyles({
                textColor: "white",
                textSize: "0.7rem",
                pathColor: `rgb(87, 204, 153, ${percentage / 100})`,
              })}
            />
          </div>

          <div className=" w-1/2 max-h-[2/3] items-center justify-center flex flex-col bg-bar  rounded-[2rem] mt-6 p-6">
            <div className="h-1/3 w-[10rem]  flex flex-col  items-center  mb-6">
              <h4 className="">Suma białka :</h4>
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
            </div>{" "}
            <div className=" h-1/3 w-[10rem]  flex flex-col  items-center  mb-6">
              <h4 className=" text-center">Suma węglowodanów :</h4>
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
            <div className=" h-1/3 w-[10rem]  flex flex-col  items-center mb-6">
              <h4 className="mt-4">Suma tłuszczy :</h4>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Food;
