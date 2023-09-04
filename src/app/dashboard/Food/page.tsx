"use client";

import {
  addBreakfast,
  deleteBreakfast,
} from "@/slice/FoodCalculator/BreakfastCalculator";
import { addLunch } from "@/slice/FoodCalculator/LunchCalculator";
import { addDinner } from "@/slice/FoodCalculator/DinnerCalculator";
import { useSelector, useDispatch } from "react-redux";

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
    // setFoodName("");
    // setProtein("");
    // setCarbo("");
    // setFat("");
    // setCalories("");
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
    // setFoodNameDinner("");
    // setProteinDinner("");
    // setCarboDinner("");
    // setFatDinner("");
    // setCaloriesDinner("");
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
    // setFoodNameDinner("");
    // setProteinDinner("");
    // setCarboDinner("");
    // setFatDinner("");
    // setCaloriesDinner("");
  };
  let totalProtein = 0;
  let totalCarbo = 0;
  let totalFat = 0;
  let totalCalories = 0;
  console.log(handleAddFood);
  console.log(handleAddFoodDinner);
  return (
    <>
      <div className="flex-col flex justify-center items-center  ">
        <div className="  ">
          <div className=" relative  bg-bar m-6 p-6 rounded-lg ">
            <table className="w-[70rem]">
              <thead>
                <tr>
                  <th style={{ width: "20%" }} className="mr-6">
                    Produkt
                  </th>
                  <th style={{ width: "20%" }}>Białko</th>
                  <th style={{ width: "20%" }}>Węglowoadny</th>
                  <th style={{ width: "20%" }}>Tłuszcze</th>
                  <th style={{ width: "20%" }}>Kcal</th>
                </tr>
              </thead>

              <tbody>
                {" "}
                <tr>
                  <td colSpan={5}>sniadniae</td>
                </tr>
                {FoodSet.map((foodDinner: any) => {
                  totalProtein += parseFloat(foodDinner.protein || 0);
                  totalCarbo += parseFloat(foodDinner.carbo || 0);
                  totalFat += parseFloat(foodDinner.fat || 0);
                  totalCalories += parseFloat(foodDinner.gainedCalories || 0);

                  return (
                    <tr key={foodDinner.id}>
                      <td>{foodDinner.FoodName}</td>
                      <td>{foodDinner.protein}</td>
                      <td>{foodDinner.carbo}</td>
                      <td>{foodDinner.fat}</td>
                      <td>{foodDinner.gainedCalories}</td>
                    </tr>
                  );
                })}{" "}
                <td colSpan={5}>
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
                    className="w-16"
                  />
                  <TextField
                    id="outlined-basic"
                    label="Białko"
                    variant="outlined"
                    onChange={(event) => {
                      setProtein(event.target.value);
                    }}
                    className="w-16"
                  />
                  <TextField
                    id="outlined-basic"
                    label="Węglodowany"
                    variant="outlined"
                    onChange={(event) => {
                      setCarbo(event.target.value);
                    }}
                    className="w-16"
                  />
                  <TextField
                    id="outlined-basic"
                    label="Tłuszcze"
                    variant="outlined"
                    onChange={(event) => {
                      setFat(event.target.value);
                    }}
                    className="w-16"
                  />
                  <TextField
                    id="outlined-basic"
                    label="Kcal"
                    variant="outlined"
                    onChange={(event) => {
                      setCalories(event.target.value);
                    }}
                    className="w-16"
                  />{" "}
                </td>{" "}
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
      </div>
    </>
  );
};
export default Food;
