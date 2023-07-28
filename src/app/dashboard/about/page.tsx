"use client";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setMass,
  setHeight,
  setGender,
  setAge,
  calculateResult,
} from "@/slice/bodyFatCalculator";
import { RootState } from "@/types/type";
import {
  goodResult,
  neutralResult,
  sadResult,
} from "@/components/Dashboard/fatResult";
const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { mass, height, gender, age, result, progress } = useSelector(
    (state: RootState) => state.bmiCalculator
  );
  const getProgressBarColor = (value: number) => {
    if (value <= 10) {
      return "#00f"; // Niebieski
    } else if (value <= 18) {
      return "#006400"; // Żółty
    } else if (value <= 24) {
      return "#ff0"; // Żółty
    } else {
      return "#f00"; // Czerwony
    }
  };

  useEffect(() => {
    dispatch(calculateResult());
  }, [mass, height, age, gender]);

  return (
    <>
      <div className="flex justify-center items-center  flex-col ">
        <div className="h-64  justify-center items-center relative ">
          <label htmlFor="mass">Masa ciała</label>
          <div className="text-3xl ">
            {mass && height ? (mass / (height * height)).toFixed(2) : ""}
          </div>
          <input
            type="number"
            id="mass"
            name="number"
            className="h-24 w-24 text-5xl"
            value={mass || ""}
            onChange={(e) => dispatch(setMass(parseFloat(e.target.value)))}
          />
          <label htmlFor="height">Wzrost</label>
          <input
            type="number"
            id="height"
            name="number"
            className="h-24 w-24 text-5xl"
            value={height || ""}
            onChange={(e) => dispatch(setHeight(parseFloat(e.target.value)))}
          />
          <label htmlFor="number">wiek</label>
          <input
            type="number"
            id="number"
            name="number"
            className="h-24 w-24 text-5xl"
            value={age || ""}
            onChange={(e) => dispatch(setAge(parseInt(e.target.value)))}
          />
          <label htmlFor="gender">Płeć</label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => dispatch(setGender(parseInt(e.target.value)))}
          >
            <option value={1}>Mężczyzna</option>
            <option value={0}>Kobieta</option>
          </select>
          <div>Wynik: {result}</div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1.5, type: "tween" }}
            style={{
              background: getProgressBarColor(result),
            }}
            className="  h-6  absolute bottom-0 w-96"
          ></motion.div>
        </div>

        {result > 0
          ? result <= 15
            ? goodResult()
            : result <= 25
            ? neutralResult()
            : sadResult()
          : null}
      </div>
    </>
  );
};

export default Dashboard;
