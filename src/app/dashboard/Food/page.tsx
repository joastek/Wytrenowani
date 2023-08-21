"use client";
import { FoodState } from "@/types/type";
import { addFood, deleteFood } from "@/slice/FoodCalculator";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { deleteTraining } from "@/slice/trainingList";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
const Food = () => {
  const dispatch = useDispatch();
  const FoodList = useSelector((state: FoodState) => state.FoodList.value);
  const FoodSet = useSelector((state: FoodState) => state.FoodSet.value);
  const [FoodName, setFoodName] = useState("");
  const [protein, setProtein] = useState("");
  const [carbo, setCarbo] = useState("");
  const [fat, setFat] = useState("");
  const [calories, setCalories] = useState("");

  const handleAddFood = (FoodId: any) => {
    const lastUserId =
      FoodList.length > 0 ? FoodList[FoodList.length - 1].id : 0;
    dispatch(
      addFood({
        id: lastUserId,
        FoodName: FoodName,
        protein: protein,
        carbo: carbo,
        fat: fat,
        calories: calories,
        // repMenuItems: Array.from({ length: Number(reps) }, (_, index) => (
        //   <MenuItem key={index + 1} value={(index + 1).toString()}>
        //     {index + 1}
        //   </MenuItem>
        // )),
        FoodId, // Dodajemy identyfikator treningu, do którego przypisujemy zestaw
      })
    );
  };
  return (
    <>
      <div className="flex justify-center items-center">
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
            <IconButton
              aria-label="delete"
              size="large"
              onClick={() => {
                dispatch(deleteTraining({ id: food.id }));
              }}
            >
              {/* <DeleteIcon /> */}
            </IconButton>
            <tbody>
              <tr>
                <td>testtttt</td>
                <td>testtttt</td>
              </tr>
            </tbody>
          </table>
          <Button variant="contained" onClick={() => handleAddFood(FoodSet.id)}>
            <AddIcon />
          </Button>
          <TextField
            id="outlined-basic"
            label="cardio"
            variant="outlined"
            onChange={(event) => {
              setFoodName(event.target.value);
            }}
          />
        </div>
        {FoodList.map((training: any) => {
          // const setsForTraining = trainingSet.filter(
          //   (set: any) => set.trainingId === training.id
          // );

          return <div key={training.id}></div>;
        })}
      </div>
    </>
  );
};
export default Food;
