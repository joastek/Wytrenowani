"use client";
import { color, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/types/type";
import {
  setMass,
  setHeight,
  setGender,
  setAge,
  calculateResult,
  setActivity,
} from "@/slice/Calculator/bodyFatCalculator";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
const Targets = () => {
  const { mass, height, gender, age, result, progress, activity, calories } =
    useSelector((state: RootState) => state.bmiCalculator);
  const dispatch = useDispatch();
  const [selectedDiv, setSelectedDiv] = useState(null);
  const divs = [
    { text: "Brak aktywności", value: 1.2 },
    { text: "Mała aktywność", value: 1.4 },
    { text: "Średnia aktywność", value: 1.6 },
    { text: "Wysoka aktywność", value: 1.9 },
  ];

  const handleClick = (index: any) => {
    setSelectedDiv(index);
  };
  return (
    <>
      <div className="flex justify-center  mt-28 ">
        {" "}
        <div className=" justify-center items-center relative  bg-bar m-6 p-6 rounded-lg  shadow-3xl">
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
                  sx={{
                    color: "white",
                  }}
                  type="number"
                  id="outlined-basic"
                  label="Masa ciała "
                  value={mass || ""}
                  variant="outlined"
                  className="m-4 w-[14rem]"
                  onChange={(e) =>
                    dispatch(setMass(parseFloat(e.target.value)))
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <p className="text-white">kg</p>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  // sx={{
                  //   color: "#000000",
                  //   border: "2px white solid",
                  //   borderRadius: "1rem",
                  //   bgcolor: deepOrange[800],
                  // }}
                  color="primary"
                  type="number"
                  id="outlined-basic"
                  label="Wzrost"
                  value={height || ""}
                  variant="outlined"
                  className=" m-4 w-[14rem]"
                  onChange={(e) => {
                    const parsedValue = parseFloat(e.target.value);
                    if (!isNaN(parsedValue) && parsedValue >= 0) {
                      dispatch(setHeight(parsedValue));
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {" "}
                        <p className="text-white">cm</p>
                      </InputAdornment>
                    ),
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
                  className="m-4 w-[14rem]"
                  onChange={(e) => dispatch(setAge(parseInt(e.target.value)))}
                />
                <FormControl sx={{ m: 2, width: "35ch" }}>
                  <InputLabel id="demo-simple-select-label">Płeć</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={gender}
                    label="Płeć"
                    className=" w-[14rem]"
                    onChange={(e: any) =>
                      dispatch(setGender(parseInt(e.target.value)))
                    }
                  >
                    <MenuItem value={1}>Mężczyzna</MenuItem>
                    <MenuItem value={0}>Kobieta</MenuItem>
                  </Select>
                </FormControl>
              </div>
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
      </div>
    </>
  );
};

export default Targets;
