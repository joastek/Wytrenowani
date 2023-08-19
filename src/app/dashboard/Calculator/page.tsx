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
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

const Calculator: React.FC = () => {
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
          <TextField
            type="number"
            id="outlined-basic"
            label="Masa ciała (kg)"
            value={mass || ""}
            variant="outlined"
            onChange={(e) => dispatch(setMass(parseFloat(e.target.value)))}
          />

          <TextField
            type="number"
            id="outlined-basic"
            label="Wzrost (m)"
            value={height || ""}
            variant="outlined"
            onChange={(e) => dispatch(setHeight(parseFloat(e.target.value)))}
          />

          <TextField
            type="number"
            id="outlined-basic"
            label="Wiek"
            value={age || ""}
            variant="outlined"
            onChange={(e) => dispatch(setAge(parseInt(e.target.value)))}
          />

          <FormControl sx={{ m: 2, width: "35ch" }}>
            <InputLabel id="demo-simple-select-label">Płeć</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={gender}
              label="Płeć"
              onChange={(e: any) =>
                dispatch(setGender(parseInt(e.target.value)))
              }
            >
              <MenuItem value={1}>Mężczyzna</MenuItem>
              <MenuItem value={0}>Kobieta</MenuItem>
            </Select>
          </FormControl>
          {/* <select
            id="gender"
            value={gender}
            onChange={(e) => dispatch(setGender(parseInt(e.target.value)))}
          >
            <option value={1}>Mężczyzna</option>
            <option value={0}>Kobieta</option>
          </select> */}
          <div>Wynik: {result}</div>
          <div className=" bg-black w-full h-6  ">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress * 2}%` }}
              transition={{ duration: 1.5, type: "tween" }}
              style={{
                background: getProgressBarColor(result),
              }}
              className="   h-6   "
            ></motion.div>
          </div>
        </div>

        {result > 0
          ? result <= 18
            ? goodResult()
            : result <= 24
            ? neutralResult()
            : sadResult()
          : null}
      </div>
    </>
  );
};

export default Calculator;
