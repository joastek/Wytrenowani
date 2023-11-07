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
import { updateTargetQuantitySteps } from "@/slice/Dashboard/numberOfSteps";
import {
  updateFillLevels,
  updateAnimationLevels,
  updateTargetFillLevel,
} from "@/slice/Dashboard/numberOfGlasses";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useUser } from "@/app/hooks/useUser";
import Button from "./Button";
const Target = () => {
  const supabaseClient = useSupabaseClient();
  const { mass, height, gender, age, result, progress, activity, calories } =
    useSelector((state: RootState) => state.bmiCalculator);
  const QuantityOfSteps = useSelector(
    (state: any) => state.stepsNumber.targetQuantitySteps
  );
  const maxFillLevel = useSelector(
    (state: any) => state.glassOfWater.targetFillLevel
  );
  const dispatch = useDispatch();
  const [selectedDiv, setSelectedDiv] = useState(null);
  const divs = [
    { text: "Brak aktywności", value: 1.2 },
    { text: "Mała aktywność", value: 1.4 },
    { text: "Średnia aktywność", value: 1.6 },
    { text: "Wysoka aktywność", value: 1.9 },
  ];
  const handleUpdateClick = () => {
    const newMaxFillLevelValue = parseInt(maxFillLevel, 10);

    if (!isNaN(newMaxFillLevelValue) && newMaxFillLevelValue > 0) {
      dispatch(updateAnimationLevels(-50));
      dispatch(updateFillLevels(0));
    }
  };
  const handleClick = (index: any) => {
    setSelectedDiv(index);
  };
  ///////////
  const test = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dateFormatter: Intl.DateTimeFormat = new Intl.DateTimeFormat(
    "pl-PL",
    options
  );
  const formattedDate: string = dateFormatter.format(test);
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      weight: "",
      date: formattedDate,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const { error: supabaseError } = await supabaseClient
      .from("weight")
      .insert({
        user_id: user!.id,
        weight: values.weight,
        date: values.date,
      });
    if (supabaseError) {
      return toast.error(supabaseError.message);
    }
    setIsLoading(false);
    toast.success("Song created!");
  };

  return (
    <>
      <div className="flex justify-center ">
        {" "}
        <div className=" justify-center items-center relative  bg-bar m-6 p-6 rounded-lg  shadow-3xl  mt-28 ">
          <h1 className="text-[2rem]">
            Podaj swoją wagę, wzrost, wiek, płeć oraz określ poziom aktywności
          </h1>
          <h2 className="text-[1rem]">
            Potrzebujemy tych informacji aby obliczyć twój poziom tkankę
            tłuszczową oraz całkowitą przemianę materii{" "}
          </h2>

          <div className="flex">
            <div className="w-2/3 ">
              <div>
                {" "}
                <form onSubmit={handleSubmit(onSubmit)}>
                  <TextField
                    disabled={isLoading}
                    {...register("weight", { required: true })}
                    sx={{
                      color: "white",
                    }}
                    type="number"
                    id="weight"
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
                </form>
                <TextField
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
              <TextField
                type="number"
                id="outlined-basic"
                label="ilość kroków"
                variant="outlined"
                className="m-4 w-[14rem]"
                onChange={(e) =>
                  dispatch(updateTargetQuantitySteps(e.target.value))
                }
              />
              <TextField
                value={maxFillLevel}
                type="number"
                id="outlined-basic"
                label="Ilość szklanek"
                variant="outlined"
                className="m-4 w-[14rem]"
                onChange={(e) => {
                  dispatch(updateTargetFillLevel(e.target.value));
                  handleUpdateClick();
                }}
              />
              <Button disabled={isLoading} type="submit" className="text-xl">
                Zapisz swoją wagę !
              </Button>
            </div>
            <div> </div>
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

export default Target;
