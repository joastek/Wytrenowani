"use client";

import {
  addBreakfast,
  deleteBreakfast,
} from "@/slice/FoodCalculator/BreakfastCalculator";
import { addLunch } from "@/slice/FoodCalculator/LunchCalculator";
import { addDinner } from "@/slice/FoodCalculator/DinnerCalculator";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { RootState } from "@/types/type";
import { useState } from "react";
import { breakfastState, lunchState, dinnerState } from "@/types/type";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";

const Food = () => {
  const dispatch = useDispatch();
  // const FoodList = useSelector((state: FoodState) => state.FoodList.value);
  const FoodSet = useSelector(
    (state: breakfastState) => state.breakfastSet.value
  );
  const FoodSetLunch = useSelector((state: lunchState) => state.lunchSet.value);
  const FoodSetDinner = useSelector(
    (state: dinnerState) => state.dinnerSet.value
  );
  const { calories } = useSelector((state: RootState) => state.bmiCalculator);
  const [FoodName, setFoodName] = useState("");
  const [protein, setProtein] = useState("");
  const [carbo, setCarbo] = useState("");
  const [fat, setFat] = useState("");
  const [gainedCalories, setCalories] = useState("");

  const handleAddFood = (FoodId: any) => {
    const breakfastId = FoodSet.length > 0 ? FoodSet[FoodSet.length - 1].id : 0;
    dispatch(
      addBreakfast({
        breakfastid: breakfastId,
        FoodName: FoodName,
        protein: protein,
        carbo: carbo,
        fat: fat,
        gainedCalories: gainedCalories,

        FoodId,
      })
    );
  };
  /////dinner
  const [FoodNameDinner, setFoodNameDinner] = useState("");
  const [proteinDinner, setProteinDinner] = useState("");
  const [carboDinner, setCarboDinner] = useState("");
  const [fatDinner, setFatDinner] = useState("");
  const [caloriesDinner, setCaloriesDinner] = useState("");
  const handleAddFoodDinner = (FoodIdDinner: any) => {
    const lastUserId =
      FoodSetDinner.length > 0 ? FoodSetDinner[FoodSetDinner.length - 1].id : 0;
    dispatch(
      addDinner({
        id: lastUserId,
        FoodNameDinner: FoodNameDinner,
        proteinDinner: proteinDinner,
        carboDinner: carboDinner,
        fatDinner: fatDinner,
        caloriesDinner: caloriesDinner,

        FoodIdDinner,
      })
    );
  };
  ///dinner
  const [FoodNameLunch, setFoodNameLunch] = useState("");
  const [proteinLunch, setProteinLunch] = useState("");
  const [carboLunch, setCarboLunch] = useState("");
  const [fatLunch, setFatLunch] = useState("");
  const [caloriesLunch, setCaloriesLunch] = useState("");
  const handleAddFoodLunch = (FoodIdLunch: any) => {
    const lastUserId =
      FoodSetLunch.length > 0 ? FoodSetLunch[FoodSetLunch.length - 1].id : 0;
    dispatch(
      addLunch({
        id: lastUserId,
        FoodNameLunch: FoodNameLunch,
        proteinLunch: proteinLunch,
        carboLunch: carboLunch,
        fatLunch: fatLunch,
        caloriesLunch: caloriesLunch,

        FoodIdLunch,
      })
    );
  };
  let totalProtein = 0;
  let totalCarbo = 0;
  let totalFat = 0;
  let totalCalories = 0;

  ///popups
  const [addNewBreakfast, setAddNewBreakfast] = useState(false);
  const [addNewDinner, setAddNewDinner] = useState(false);
  const [addNewLunch, setAddNewLunch] = useState(false);
  const handleAddNewBreakfast = () => {
    setAddNewBreakfast((prev) => !prev);
  };
  return (
    <>
      <div className="flex justify-center items-center  ">
        <div className="p-6">
          <table className="  m-12  w-[70rem] bg-bar rounded-lg p-12 border-collapse">
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

            <tbody className="block ">
              {" "}
              <div className="m-6  rounded-lg border-[0.2rem] border-secondary text-lg h-[20rem]">
                <tr className="bg-third w-full flex z-10 justify-between rounded-t-[0.4rem] h-[20%]">
                  <td colSpan={5} className="p-4">
                    Śniadanie
                  </td>
                  <motion.div layout="position" className="flex">
                    <motion.button
                      // variant="contained"
                      onClick={() => handleAddNewBreakfast()}
                      className="p-4 w-24 h-24 bg-white "
                    >
                      <AddIcon />
                    </motion.button>
                    {addNewBreakfast && (
                      <>
                        {" "}
                        <div
                          className="fixed top-0 left-0 right-0 bottom-0  bg-black  backdrop-filter backdrop-blur-[2px] bg-opacity-30 z-40"
                          onClick={() => handleAddNewBreakfast()}
                        ></div>
                        <motion.td
                          animate={{ opacity: addNewBreakfast ? 1 : 0 }} // Animacja wejścia
                          exit={{ opacity: 0 }} // Animacja wyjścia
                          colSpan={5}
                          className="   bg-white w-[50rem]   h-[20rem] z-50"
                        >
                          <Button
                            variant="contained"
                            onClick={() => handleAddFood(FoodSet.id)}
                          >
                            <AddIcon />
                          </Button>
                          <TextField
                            id="outlined-basic"
                            label="Produkt"
                            variant="outlined"
                            onChange={(event) => {
                              setFoodName(event.target.value);
                            }}
                            className="w-24"
                          />
                          <TextField
                            id="outlined-basic"
                            label="Białko"
                            variant="outlined"
                            onChange={(event) => {
                              setProtein(event.target.value);
                            }}
                            className="w-24"
                          />
                          <TextField
                            id="outlined-basic"
                            label="Węglodowany"
                            variant="outlined"
                            onChange={(event) => {
                              setCarbo(event.target.value);
                            }}
                            className="w-24"
                          />
                          <TextField
                            id="outlined-basic"
                            label="Tłuszcze"
                            variant="outlined"
                            onChange={(event) => {
                              setFat(event.target.value);
                            }}
                            className="w-24"
                          />
                          <TextField
                            id="outlined-basic"
                            label="Kcal"
                            variant="outlined"
                            onChange={(event) => {
                              setCalories(event.target.value);
                            }}
                            className="w-24"
                          />{" "}
                        </motion.td>{" "}
                      </>
                    )}
                  </motion.div>
                </tr>
                {FoodSet.map((foodDinner: any, index: number) => {
                  totalProtein += parseFloat(foodDinner.protein || 0);
                  totalCarbo += parseFloat(foodDinner.carbo || 0);
                  totalFat += parseFloat(foodDinner.fat || 0);
                  totalCalories += parseFloat(foodDinner.gainedCalories || 0);
                  const isEven = index % 2 === 0;
                  const rowClass = isEven ? "bg-bar" : "";
                  return (
                    <tr key={foodDinner.id} className={rowClass}>
                      <td>{foodDinner.FoodName}</td>
                      <td>{foodDinner.protein}</td>
                      <td>{foodDinner.carbo}</td>
                      <td>{foodDinner.fat}</td>
                      <td>{foodDinner.gainedCalories}</td>
                    </tr>
                  );
                })}{" "}
              </div>
              <tr>
                <td colSpan={5}>obiod</td>
              </tr>
              {FoodSetLunch.map((training: any) => {
                // Dodaj wartość protein do sumy
                totalProtein += parseFloat(training.proteinLunch || 0);
                totalCarbo += parseFloat(training.carboLunch || 0);
                totalFat += parseFloat(training.fatLunch || 0);
                totalCalories += parseFloat(training.caloriesLunch || 0);

                return (
                  <tr key={training.id}>
                    <td>{training.FoodNameLunch}</td>
                    <td>{training.proteinLunch}</td>
                    <td>{training.carboLunch}</td>
                    <td>{training.fatLunch}</td>
                    <td>{training.caloriesLunch}</td>
                  </tr>
                );
              })}{" "}
              <td colSpan={5}>
                <Button
                  variant="contained"
                  onClick={() => handleAddFoodLunch(FoodSetLunch.id)}
                >
                  <AddIcon />
                </Button>
                <TextField
                  id="outlined-basic"
                  label="Produkt"
                  variant="outlined"
                  onChange={(event) => {
                    setFoodNameLunch(event.target.value);
                  }}
                  className="w-16"
                />
                <TextField
                  id="outlined-basic"
                  label="Białko"
                  variant="outlined"
                  onChange={(event) => {
                    setProteinLunch(event.target.value);
                  }}
                  className="w-16"
                />
                <TextField
                  id="outlined-basic"
                  label="Węglodowany"
                  variant="outlined"
                  onChange={(event) => {
                    setCarboLunch(event.target.value);
                  }}
                  className="w-16"
                />
                <TextField
                  id="outlined-basic"
                  label="Tłuszcze"
                  variant="outlined"
                  onChange={(event) => {
                    setFatLunch(event.target.value);
                  }}
                  className="w-16"
                />
                <TextField
                  id="outlined-basic"
                  label="Kcal"
                  variant="outlined"
                  onChange={(event) => {
                    setCaloriesLunch(event.target.value);
                  }}
                  className="w-16"
                />{" "}
              </td>{" "}
              <tr>
                <td colSpan={5}>kolocja</td>
              </tr>
              {FoodSetDinner.map((training: any) => {
                // Dodaj wartość protein do sumy
                totalProtein += parseFloat(training.proteinDinner || 0);
                totalCarbo += parseFloat(training.carboDinner || 0);
                totalFat += parseFloat(training.fatDinner || 0);
                totalCalories += parseFloat(training.caloriesDinner || 0);

                return (
                  <tr key={training.id}>
                    <td>{training.FoodNameDinner}</td>
                    <td>{training.proteinDinner}</td>
                    <td>{training.carboDinner}</td>
                    <td>{training.fatDinner}</td>
                    <td>{training.caloriesDinner}</td>
                  </tr>
                );
              })}{" "}
              <td colSpan={5}>
                <Button
                  variant="contained"
                  onClick={() => handleAddFoodDinner(FoodSetDinner.id)}
                >
                  <AddIcon />
                </Button>
                <TextField
                  id="outlined-basic"
                  label="Produkt"
                  variant="outlined"
                  onChange={(event) => {
                    setFoodNameDinner(event.target.value);
                  }}
                  className="w-16"
                />
                <TextField
                  id="outlined-basic"
                  label="Białko"
                  variant="outlined"
                  onChange={(event) => {
                    setProteinDinner(event.target.value);
                  }}
                  className="w-16"
                />
                <TextField
                  id="outlined-basic"
                  label="Węglodowany"
                  variant="outlined"
                  onChange={(event) => {
                    setCarboDinner(event.target.value);
                  }}
                  className="w-16"
                />
                <TextField
                  id="outlined-basic"
                  label="Tłuszcze"
                  variant="outlined"
                  onChange={(event) => {
                    setFatDinner(event.target.value);
                  }}
                  className="w-16"
                />
                <TextField
                  id="outlined-basic"
                  label="Kcal"
                  variant="outlined"
                  onChange={(event) => {
                    setCaloriesDinner(event.target.value);
                  }}
                  className="w-16"
                />{" "}
              </td>{" "}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-center  w-[70rem]  items-stretch">
        <div className="w-1/2  bg-bar m-6">
          {" "}
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
      <table className="border-collapse border border-slate-500">
        <thead>
          <tr>
            <th>test</th>
            <th>test2</th>
          </tr>
        </thead>
      </table>
    </>
  );
};
export default Food;
