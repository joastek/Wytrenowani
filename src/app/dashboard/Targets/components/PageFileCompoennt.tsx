"use client";
import React from "react";
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
import { useUser } from "@/components/hooks/useUser";
import Button from "@/components/Targets/Button";
import { useRouter } from "next/navigation";
import ActivityBars from "@/components/Targets/ActivityBars";

const PageFileCompoennt= () => {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const { mass, height, gender, age, result, progress, activity, calories } =
    useSelector((state: RootState) => state.bmiCalculator);

  const maxFillLevel = useSelector(
    (state: any) => state.glassOfWater.targetFillLevel
  );
  const dispatch = useDispatch();

  const handleUpdateClick = () => {
    const newMaxFillLevelValue = parseInt(maxFillLevel, 10);

    if (!isNaN(newMaxFillLevelValue) && newMaxFillLevelValue > 0) {
      dispatch(updateAnimationLevels(-50));
      dispatch(updateFillLevels(0));
    }
  };

  ///////////
  const test = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  const dateFormatter: Intl.DateTimeFormat = new Intl.DateTimeFormat(
    "pl-PL",
    options
  );
  const formattedDate: string = dateFormatter.format(test);
  const { user } = useUser();

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

    toast.success("Waga dodana !");
    router.refresh();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="columns ">
          <div className="column">
            <TextField
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
              onChange={(e) => dispatch(setMass(parseFloat(e.target.value)))}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <p className="text-white">kg</p>
                  </InputAdornment>
                ),
              }}
            />
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
            />{" "}
            <TextField
              type="number"
              id="outlined-basic"
              label="Wiek"
              value={age || ""}
              variant="outlined"
              className="m-4 w-[14rem]"
              onChange={(e) => dispatch(setAge(parseInt(e.target.value)))}
            />
          </div>
          <div className="column">
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
          </div>
          <div className="column ">
            <ActivityBars />
          </div>
        </div>
        <Button type="submit" className="text-xl bg-contrast">
          Zapisz swoje dane !
        </Button>{" "}
      </form>
    </>
  );
};

export default PageFileCompoennt;
