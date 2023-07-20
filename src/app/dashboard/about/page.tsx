"use client";
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
const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { mass, height, gender, age, result, progress } = useSelector(
    (state: RootState) => state.bmiCalculator
  );

  useEffect(() => {
    dispatch(calculateResult());
  }, [mass, height, age, gender]);

  return (
    <>
      <div className="h-64 bg-slate-400">
        <label htmlFor="mass">Masa ciała</label>
        <div className="text-3xl flex">
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
        <progress
          value={parseFloat(result)}
          max="40"
          className="w-full"
        ></progress>
      </div>
    </>
  );
};

export default Dashboard;
