"use client";
import { color, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setMass,
  setHeight,
  setGender,
  setAge,
  calculateResult,
  setActivity,
} from "@/slice/Calculator/bodyFatCalculator";
import { RootState } from "@/types/type";
import {
  veryLowFat,
  lowFat,
  goodFat,
  optionalFat,
  obeseFat,
  veryObeseFat,
  thickFat,
} from "@/components/Calculator/fatResult";
import {
  LowBMI,
  NormalBMI,
  OverweightBMI,
  ObesityFirstDegreeBMI,
  ObesitySecondDegreeBMI,
  ObesityThirdDegreeBMI,
} from "@/components/Calculator/BMIResult";
import {
  veryLowFatIndication,
  lowFatIndication,
  goodFatIndication,
  optionalFatIndication,
  obeseFatIndication,
  veryObeseFatIndication,
  thickFatIndication,
} from "@/components/Calculator/fatIndications";
import "@/styles/theme.css";

const Calculator: React.FC = () => {
  const dispatch = useDispatch();
  const { mass, height, gender, age, result, progress, activity, calories } =
    useSelector((state: RootState) => state.bmiCalculator);
  const getProgressBarColorFAT = (value: number) => {
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
  const getProgressBarColorBMI = (value: number) => {
    if (value <= 16) {
      return "#f00"; //Czerwony
    } else if (value <= 18.5) {
      return " #ff0"; // Żółty
    } else if (value <= 25) {
      return "#006400"; //Zielony
    } else if (value <= 30) {
      return "#D38888";
    } else {
      return "#f00"; // Czerwony
    }
  };
  useEffect(() => {
    dispatch(calculateResult());
  }, [mass, height, age, gender, activity]);
  const [selectedDiv, setSelectedDiv] = useState(null);

  const BMI: any =
    mass && height ? ((mass / (height * height)) * 10000).toFixed(1) : 0;

  return (
    <>
      <div className="flex justify-center items-center  flex-col   ">
        <div className="w-[70rem] ">
          <div
            className={`bg-bar rounded-lg w-[${
              result * 2
            }rem] justify-center items-center relative p-6  shadow-3xl  mt-28`}
          >
            <div className="bg-black h-6 rounded-lg mt-10 relative w-full  shadow-3xl">
              <div className="absolute left-0 top-[120%] text-lg">0%</div>
              <div className="absolute left-[20%] top-[120%] text-lg">8%</div>
              <div className="absolute left-[30%] top-[120%] text-lg">12%</div>
              <div className="absolute left-[37.5%] top-[120%] text-lg">
                15%
              </div>
              <div className="absolute left-[47.5%] top-[120%] text-lg">
                19%
              </div>
              <div className="absolute left-[62.5%] top-[120%] text-lg">
                25%
              </div>
              <div className="absolute right-0 top-[120%] text-lg">40%</div>

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((result / 40) * 100, 100)}%` }}
                transition={{ duration: 1.5, type: "tween" }}
                style={{
                  background: getProgressBarColorFAT(result),
                }}
                className="h-6 rounded-lg"
              ></motion.div>
            </div>{" "}
          </div>
          <div
            className={`bg-bar rounded-lg w-[${
              BMI * 2
            }rem] justify-center items-center relative p-6  shadow-3xl mt-12`}
          >
            <div className="bg-black h-6 rounded-lg mt-10 relative w-full  shadow-3xl">
              <div className="absolute left-0 top-[120%] text-lg">0</div>
              <div className="absolute left-[32%] top-[120%] text-lg">16</div>

              <div className="absolute left-[37%] top-[120%] text-lg">18,5</div>
              <div className="absolute left-[50%] top-[120%] text-lg">25</div>
              <div className="absolute left-[60%] top-[120%] text-lg">30</div>
              <div className="absolute left-[70%] top-[120%] text-lg">35</div>
              <div className="absolute left-[80%] top-[120%] text-lg">40</div>
              <div className="absolute right-0 top-[120%] text-lg">50</div>

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((BMI / 50) * 100, 100)}%` }}
                transition={{ duration: 1.5, type: "tween" }}
                style={{
                  background: getProgressBarColorBMI(BMI),
                }}
                className="h-6 rounded-lg mt-24"
              ></motion.div>
            </div>
          </div>

          <div className="  mt-5 flex items-stretch ">
            <div className=" w-1/3  weather_box  rounded-lg  p-6  shadow-3xl">
              <h3>Poziom tkanki tłuszczowej:</h3>
              <h2>{result}%</h2>
              <h3>BMI:</h3> <h2>{BMI}</h2>
              <br /> <h3>CPM:</h3>
              <h2>{calories} kcal</h2>
            </div>
            <div className="w-2/3  weather_box  rounded-lg  p-6 ml-5  shadow-3xl">
              {" "}
              <h2> Opis BMI:</h2> <br />
              <div className="text-lg">
                {BMI > 0
                  ? BMI <= 18.5
                    ? LowBMI()
                    : BMI <= 24.9
                    ? NormalBMI()
                    : BMI <= 29.9
                    ? OverweightBMI()
                    : BMI <= 34.9
                    ? ObesityFirstDegreeBMI()
                    : BMI <= 39.9
                    ? ObesitySecondDegreeBMI()
                    : ObesityThirdDegreeBMI()
                  : null}
              </div>
            </div>
          </div>
          <div className=" mt-6 flex">
            <div className="w-1/2 weather_box  rounded-lg  p-6  ">
              {" "}
              <h2>Charakterystyka:</h2>
              <div className="text-lg">
                {result > 0
                  ? result <= 8
                    ? veryLowFat()
                    : result <= 12
                    ? lowFat()
                    : result <= 15
                    ? goodFat()
                    : result <= 19
                    ? optionalFat()
                    : result <= 25
                    ? obeseFat()
                    : result <= 35
                    ? veryObeseFat()
                    : thickFat()
                  : null}
              </div>
            </div>{" "}
            <div className="w-1/2 weather_box  rounded-lg  p-6 ml-5 ">
              {" "}
              <h2> Wskazania:</h2> <br />
              <div className="text-lg">
                {result > 0
                  ? result <= 8
                    ? veryLowFatIndication()
                    : result <= 12
                    ? lowFatIndication()
                    : result <= 15
                    ? goodFatIndication()
                    : result <= 19
                    ? optionalFatIndication()
                    : result <= 25
                    ? obeseFatIndication()
                    : result <= 35
                    ? veryObeseFatIndication()
                    : thickFatIndication()
                  : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calculator;
