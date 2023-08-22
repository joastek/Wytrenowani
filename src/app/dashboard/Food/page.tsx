"use client";

import { addFood, deleteFood } from "@/slice/FoodCalculator";
import { useSelector, useDispatch } from "react-redux";

import { useState } from "react";
import { deleteTraining } from "@/slice/trainingList";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";

const Food = () => {
  const dispatch = useDispatch();
  // const FoodList = useSelector((state: FoodState) => state.FoodList.value);
  const FoodSet = useSelector((state: any) => state.foodSet.value);
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
              {FoodSet.map((training: any) => {
                if (training && training.protein !== undefined) {
                  // Dodaj wartość protein do sumy
                  totalProtein += parseFloat(training.protein || 0);
                  totalCarbo += parseFloat(training.carbo || 0);
                  totalFat += parseFloat(training.fat || 0);
                  totalCalories += parseFloat(training.calories || 0);

                  return (
                    <tr key={training.id}>
                      <td>{training.FoodName}</td>
                      <td>{training.protein}</td>
                      <td>{training.carbo}</td>
                      <td>{training.fat}</td>
                      <td>{training.calories}</td>
                    </tr>
                  );
                }
                return null;
              })}
            </tbody>
          </table>

          <Button variant="contained" onClick={() => handleAddFood(FoodSet.id)}>
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
          />
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
