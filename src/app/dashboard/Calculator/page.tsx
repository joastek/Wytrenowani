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
  veryLowFat,
  lowFat,
  goodFat,
  optionalFat,
  obeseFat,
  veryObeseFat,
  thickFat,
} from "@/components/Calculator/fatResult";
import {
  veryLowFatIndication,
  lowFatIndication,
  goodFatIndication,
  optionalFatIndication,
  obeseFatIndication,
  veryObeseFatIndication,
  thickFatIndication,
} from "@/components/Calculator/fatIndications";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

const Calculator: React.FC = () => {
  const dispatch = useDispatch();
  const { mass, height, gender, age, result, progress, activity, calories } =
    useSelector((state: RootState) => state.bmiCalculator);
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
                  onChange={(e) => {
                    const parsedValue = parseFloat(e.target.value);
                    if (!isNaN(parsedValue) && parsedValue >= 0) {
                      dispatch(setHeight(parsedValue));
                    }
                  }}
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
          </div>
        </div>
        <div className="w-[70rem]">
          <div
            className={`bg-bar rounded-lg w-[${
              result * 2
            }rem] justify-center items-center relative p-6`}
          >
            <div className="bg-black h-6 rounded-lg mt-10 relative w-full">
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
                  background: getProgressBarColor(result),
                }}
                className="h-6 rounded-lg"
              ></motion.div>
            </div>
            <div className=" mt-[5%]">
              <h2>Charakterystyka:</h2>
              <div className="text-lg w-1/2">
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
            </div>
          </div>
          <div className="  mt-5 flex items-stretch ">
            <div className=" w-1/3  bg-bar  rounded-lg  p-6">
              <h3>Poziom tkanki tłuszczowej:</h3>
              <h2>{result}%</h2> <br />
              <h3>BMI:</h3>{" "}
              <h2>
                {mass && height ? (mass / (height * height)).toFixed(2) : ""}
              </h2>
              <br /> <h3>CPM:</h3>
              <h2>{calories} kcal</h2>
            </div>
            <div className="w-2/3  bg-bar  rounded-lg  p-6 ml-5">
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
          <div className="text-3xl "></div>
        </div>
      </div>
    </>
  );
};

export default Calculator;
