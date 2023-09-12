"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/types/type";
import { motion } from "framer-motion";
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
      <div className="flex justify-center items-center  flex-col  ">
        <div className="w-[70rem] justify-center items-center relative m-6">
          <table className="   w-full bg-bar rounded-lg  ">
            <thead className="">
              <tr className="flex m-6 p-4 rounded-lg border-[0.4rem] border-secondary text-lg ">
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
              <div className="overflow-y-auto h-[40rem]">
                <Breakfast />
                <Dinner />
                <Lunch />
              </div>
            </tbody>
          </table>
        </div>

        <div className="flex   w-[70rem]  mt-[2rem] bg-bar items-stretch p-12   rounded-lg">
          <div className="w-1/4">
            <div className="w-[13rem] h-[13rem] flex flex-col  items-center">
              Suma kcal
              <CircularProgressbar
                value={totalCalories}
                maxValue={calories}
                text={` \n ${totalCalories}/${calories} kcal`}
                styles={buildStyles({
                  textColor: "white",
                  textSize: "0.4rem",
                  pathColor: `rgba(62, 112, 199, ${percentage / 100})`,
                })}
              />
            </div>
          </div>
          <div className="w-3/4 flex items-center justify-center">
            <div className=" w-[10rem] h-[10rem] flex flex-col  items-center mr-8 ">
              Suma białka:
              <CircularProgressbar
                value={totalProtein}
                maxValue={Protein}
                text={` \n ${totalProtein}/${Protein} kcal`}
                styles={buildStyles({ textColor: "white", textSize: "0.4rem" })}
              />{" "}
            </div>{" "}
            <div className=" w-[10rem] h-[10rem] flex flex-col  items-center mr-8">
              Suma węglowodanów
              <CircularProgressbar
                value={totalCarbo}
                maxValue={Carbo}
                text={` \n ${totalCarbo}/${Carbo} kcal`}
                styles={buildStyles({ textColor: "white", textSize: "0.4rem" })}
              />
            </div>
            <div className=" w-[10rem] h-[10rem] flex flex-col  items-center">
              suma tłuszczy:
              <CircularProgressbar
                value={totalFat}
                maxValue={Fat}
                text={` \n ${totalFat}/${Fat} kcal`}
                styles={buildStyles({ textColor: "white", textSize: "0.4rem" })}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Food;
