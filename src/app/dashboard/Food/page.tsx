"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/types/type";
import { motion } from "framer-motion";
import Breakfast from "@/components/Food/SetBreakfastMeal";
import Dinner from "@/components/Food/SetDinnerMeal";
import Lunch from "@/components/Food/SetLunchMeal";

const Food = () => {
  const { totalProtein, totalCarbo, totalFat, totalCalories } = useSelector(
    (state: any) => state.nutriensSum
  );

  const { calories, result } = useSelector(
    (state: RootState) => state.bmiCalculator
  );

  // Oblicz procentowe uzupełnienie okręgu
  const percentageComplete = (totalCalories / calories) * 100;

  const radius = 95; // Promień koła
  const circumference = 2 * Math.PI * radius; // Obwód koła

  let progress = (percentageComplete / 100) * circumference; // Długość wypełnienia okręgu
  if (progress >= circumference) {
    progress = circumference;
  }
  const getProgressBarColor = (value: number) => {
    if (totalCalories <= calories) {
      return "#80ed99"; // Niebieski
    } else {
      return "#f00"; // Czerwony
    }
  };
  console.log(totalCalories);
  console.log(calories);
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

        <div className="flex   w-[70rem]  mt-[2rem] bg-bar p-6">
          <div className="  h-[16rem]">
            {" "}
            <motion.svg width="300" height="200">
              <motion.circle
                cx="50%"
                cy="50%"
                r={radius}
                fill="transparent"
                stroke={getProgressBarColor(totalCalories)}
                strokeWidth="7" // Grubość obramowania koła
                strokeDasharray={circumference}
                strokeDashoffset={circumference - progress}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: circumference - progress }}
                transition={{ duration: 1.5, type: "tween" }}
                width="50"
                height="50"
                xmlns="http://www.w3.org/2000/svg"
              >
                {" "}
              </motion.circle>{" "}
              <text
                x="750%"
                y="50%"
                textAnchor="middle"
                className="text-red-600 text-lg"
              >
                <tspan x="50%" dy="0">
                  Suma kcal:
                </tspan>
                <tspan x="50%" dy="1.2em">
                  {totalCalories}/{calories} kcal
                </tspan>
              </text>
            </motion.svg>
            <p> </p>
          </div>
          <div className=" ">
            {" "}
            <p>Suma białka: {totalProtein} g</p>
            <p>Suma wegli: {totalCarbo} g</p>
            <p>Suma tłuszczy: {totalFat} g</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Food;
