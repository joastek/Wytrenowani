"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setMass,
  setHeight,
  setGender,
  setAge,
  calculateResult,
  setActivity,
} from "@/slice/bodyFatCalculator";
import { RootState } from "@/types/type";
import {
  goodResult,
  neutralResult,
  sadResult,
} from "@/components/Dashboard/fatResult";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

const Calculator: React.FC = () => {
  const dispatch = useDispatch();
  const { mass, height, gender, age, result, progress, activity } = useSelector(
    (state: RootState) => state.bmiCalculator
  );
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

  useEffect(() => {
    dispatch(calculateResult());
  }, [mass, height, age, gender, activity]);
  const [selectedDiv, setSelectedDiv] = useState(null);

  const handleClick = (index: any) => {
    setSelectedDiv(index);
  };

  const divs = [
    { text: "Brak aktywności", value: 1.2 },
    { text: "Mała aktywność", value: 1.4 },
    { text: "Średnia aktywność", value: 1.6 },
    { text: "Wysoka aktywność", value: 1.9 },
  ];
  return (
    <>
      <div className="flex justify-center items-center  flex-col  ">
        <div className=" justify-center items-center relative  bg-bar m-6 p-6 rounded-lg">
          <h1 className="text-[2rem]">
            Podaj swoją wagę, wzrost, wiek, płeć oraz określ poziom aktywności
          </h1>
          <h2 className="text-[1rem]">
            Potrzebujemy tych informacji aby obliczyć twój poziom tkankę
            tłuszczową oraz całkowitą przemianę materii
          </h2>

          <div className="flex">
            <div className="w-2/3 ">
              <div>
                {" "}
                <TextField
                  type="number"
                  id="outlined-basic"
                  label="Masa ciała (kg)"
                  value={mass || ""}
                  variant="outlined"
                  className="m-4"
                  onChange={(e) =>
                    dispatch(setMass(parseFloat(e.target.value)))
                  }
                />
                <TextField
                  type="number"
                  id="outlined-basic"
                  label="Wzrost (m)"
                  value={height || ""}
                  variant="outlined"
                  className="m-4"
                  onChange={(e) =>
                    dispatch(setHeight(parseFloat(e.target.value)))
                  }
                />
              </div>
              <div>
                {" "}
                <TextField
                  type="number"
                  id="outlined-basic"
                  label="Wiek"
                  value={age || ""}
                  variant="outlined"
                  className="m-4"
                  onChange={(e) => dispatch(setAge(parseInt(e.target.value)))}
                />
                <FormControl sx={{ m: 2, width: "35ch" }}>
                  <InputLabel id="demo-simple-select-label">Płeć</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={gender}
                    label="Płeć"
                    className=""
                    onChange={(e: any) =>
                      dispatch(setGender(parseInt(e.target.value)))
                    }
                  >
                    <MenuItem value={1}>Mężczyzna</MenuItem>
                    <MenuItem value={0}>Kobieta</MenuItem>
                  </Select>
                </FormControl>
              </div>

              {/* <select
            id="gender"
            value={gender}
            onChange={(e) => dispatch(setGender(parseInt(e.target.value)))}
          >
            <option value={1}>Mężczyzna</option>
            <option value={0}>Kobieta</option>
          </select> */}
              <div>{/* {calories} */}</div>
            </div>
            <div className="w-1/3 ">
              {divs.map((item) => (
                <motion.div
                  key={item.value}
                  whileHover={{ scale: 1.05 }}
                  className={`border  p-1 text-lg m-2 cursor-pointer ${
                    selectedDiv === item.value ? "bg-red-500" : ""
                  }`}
                  onClick={() => {
                    handleClick(item.value);
                    dispatch(setActivity(item.value)); // Ustaw aktywność przy kliknięciu
                  }}
                >
                  {item.text}
                </motion.div>
              ))}
            </div>
            {activity * result * 100}
          </div>
        </div>
        <div className="w-[70rem]">
          <div
            className={`bg-bar rounded-lg w-[${
              result * 2
            }rem] justify-center items-center relative p-6`}
          >
            <div className="bg-black h-6 rounded-lg mt-10 relative w-full">
              <div className="absolute left-0 top-[120%]">0%</div>
              <div className="absolute left-[20%] top-[120%]">8%</div>
              <div className="absolute left-[47.5%] top-[120%]">19%</div>
              <div className="absolute left-[62.5%] top-[120%]">25%</div>
              <div className="absolute right-0 top-[120%]">40%</div>

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(result / 40) * 100}%` }}
                transition={{ duration: 1.5, type: "tween" }}
                style={{
                  background: getProgressBarColor(result),
                }}
                className="h-6 rounded-lg"
              ></motion.div>
            </div>
            <div className="flex justify-center items-center">
              {result > 0
                ? result <= 18
                  ? goodResult()
                  : result <= 24
                  ? neutralResult()
                  : sadResult()
                : null}
            </div>
          </div>
          Wynik: {result}
          <label htmlFor="mass">Masa ciała </label>
          <div className="text-3xl ">
            {mass && height ? (mass / (height * height)).toFixed(2) : ""}
          </div>
        </div>
      </div>
    </>
  );
};

export default Calculator;
