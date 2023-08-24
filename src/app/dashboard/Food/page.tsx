"use client";

import { addFood, deleteFood } from "@/slice/FoodCalculator/DinnerCalculator";
import { useSelector, useDispatch } from "react-redux";

import { useState } from "react";
import { FoodState } from "@/types/type";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";

const Food = () => {
  const dispatch = useDispatch();
  // const FoodList = useSelector((state: FoodState) => state.FoodList.value);
  const FoodSet = useSelector((state: FoodState) => state.foodSet.value);
  const FoodSetDinner = useSelector(
    (state: FoodState) => state.foodSetDinner.value
  );
  const [FoodName, setFoodName] = useState("");
  const [protein, setProtein] = useState("");
  const [carbo, setCarbo] = useState("");
  const [fat, setFat] = useState("");
  const [calories, setCalories] = useState("");

  const handleAddFood = (FoodId: any) => {
    const lastUserId = FoodSet.length > 0 ? FoodSet[FoodSet.length - 1].id : 0;
    dispatch(
      addFood({
        id: lastUserId,
        FoodName: FoodName,
        protein: protein,
        carbo: carbo,
        fat: fat,
        calories: calories,

        FoodId,
      })
    );
    setFoodName("");
    setProtein("");
    setCarbo("");
    setFat("");
    setCalories("");
  };
  /////dinner
  const [FoodNameDinner, setFoodNameDinner] = useState("");
  const [proteinDinner, setProteinDinner] = useState("");
  const [carboDinner, setCarboDinner] = useState("");
  const [fatDinner, setFatDinner] = useState("");
  const [caloriesDinner, setCaloriesDinner] = useState("");
  const handleAddFoodDinner = (FoodIdDinner: any) => {
    const lastUserId =
      FoodSetDinner.length > 0
        ? FoodSetDinner[FoodSetDinner.length - 1].idDinner
        : 0;
    dispatch(
      addFood({
        idDinner: lastUserId,
        FoodNameDinner: FoodNameDinner,
        proteinDinner: proteinDinner,
        carboDinner: carboDinner,
        fatDinner: fatDinner,
        caloriesDinner: caloriesDinner,

        FoodIdDinner,
      })
    );
    setFoodNameDinner("");
    setProteinDinner("");
    setCarboDinner("");
    setFatDinner("");
    setCaloriesDinner("");
  };
  let totalProtein = 0;
  let totalCarbo = 0;
  let totalFat = 0;
  let totalCalories = 0;

  return (
    <>
      <div className="flex justify-center items-center bg-white">
        <div>
          <table>
            <thead>
              <tr>
                <th className="mr-6">Produkt</th>
                <th>Białko</th>
                <th>Węglowoadny</th>
                <th>Tłuszcze</th>
                <th>Kcal</th>
              </tr>
            </thead>
            {/* <IconButton
              aria-label="delete"
              size="large"
              onClick={() => {
                dispatch(deleteTraining({ id: food.id }));
              }}
            >
              {/* <DeleteIcon /> */}
            {/* </IconButton> */}
            <tbody>
              {" "}
              <tr>
                <td colSpan={5}>sniadniae</td>
              </tr>
              {FoodSet.map((foodDinner: any) => {
                totalProtein += parseFloat(foodDinner.protein || 0);
                totalCarbo += parseFloat(foodDinner.carbo || 0);
                totalFat += parseFloat(foodDinner.fat || 0);
                totalCalories += parseFloat(foodDinner.calories || 0);

                return (
                  <tr key={foodDinner.id}>
                    <td>{foodDinner.FoodName}</td>
                    <td>{foodDinner.protein}</td>
                    <td>{foodDinner.carbo}</td>
                    <td>{foodDinner.fat}</td>
                    <td>{foodDinner.calories}</td>
                  </tr>
                );
              })}{" "}
              <td colSpan={5}>
                <Button
                  variant="contained"
                  onClick={() => console.log(handleAddFood(FoodSetDinner.id))}
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
              {FoodSetDinner.map((training: any) => {
                // Dodaj wartość protein do sumy
                totalProtein += parseFloat(training.proteinDinner || 0);
                totalCarbo += parseFloat(training.carboDinner || 0);
                totalFat += parseFloat(training.fatDinner || 0);
                totalCalories += parseFloat(training.caloriesDinner || 0);

                return (
                  <tr key={training.idDinner}>
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
                  onClick={() =>
                    console.log(handleAddFoodDinner(FoodSetDinner.id))
                  }
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

          <p>Suma białka: {totalProtein} g</p>
          <p>Suma wegli: {totalCarbo} g</p>
          <p>Suma tłuszczy: {totalFat} g</p>
          <p>Suma kcal: {totalCalories} g</p>
        </div>
      </div>
    </>
  );
};
export default Food;
