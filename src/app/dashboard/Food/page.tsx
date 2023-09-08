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
  const percentageComplete = (calories / totalCalories) * 100;

  const radius = 25; // Promień koła
  const circumference = 2 * Math.PI * radius; // Obwód koła

  const progress = (percentageComplete / 100) * circumference; // Długość wypełnienia okręgu

  const getProgressBarColor = (value: number) => {
    if (value <= 8) {
      return "#00f"; // Niebieski
    } else if (value <= 19) {
      return "#006400"; // Zielony
    } else if (value <= 25) {
      return "#ff0"; // Żółty
    } else {
      return "#f00"; // Czerwony
    }
  };
  return (
    <>
      <div className="flex justify-center items-center  flex-col ">
        <div className="w-[70rem] justify-center items-center relative">
          <table className="  m-12  w-full bg-bar rounded-lg p-12 ">
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
              <div className="overflow-y-auto h-[45rem]">
                <Breakfast />
                <Dinner />
                <Lunch />
              </div>
            </tbody>
          </table>
        </div>

        <div className="flex justify-center  w-[70rem]  items-stretch">
          <div className="w-1/2  bg-bar m-6">
            {" "}
            <motion.svg
              width="100"
              height="100"
              xmlns="http://www.w3.org/2000/svg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <motion.circle
                cx="50"
                cy="50"
                r={radius}
                fill="transparent"
                stroke={getProgressBarColor(totalCalories)} // Kolor okręgu
                strokeWidth="5" // Grubość obramowania okręgu
                strokeDasharray={circumference}
                strokeDashoffset={circumference - progress}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: circumference - progress }}
                transition={{ duration: 1.5, type: "tween" }}
              />
            </motion.svg>
            <p>
              Suma kcal: {totalCalories}/{calories} kcal
            </p>
          </div>
          <div className="w-1/2  bg-bar">
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
