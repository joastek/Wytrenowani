"use client";
import { addLunch, deleteLunch } from "@/slice/FoodCalculator/LunchCalculator";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { useState } from "react";
import { lunchState } from "@/types/type";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import {
  addNutriens,
  deleteNutriens,
} from "@/slice/FoodCalculator/NutrientsSum";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
const Lunch = () => {
  const dispatch = useDispatch();
  const FoodSetLunch = useSelector((state: lunchState) => state.lunchSet.value);
  const [FoodName, setFoodName] = useState("");
  const [protein, setProtein] = useState("");
  const [carbo, setCarbo] = useState("");
  const [fat, setFat] = useState("");
  const [gainedCalories, setCalories] = useState("");
  const LunchId =
    FoodSetLunch.length > 0 ? FoodSetLunch[FoodSetLunch.length - 1].id : 0;
  const proteinValue = isNaN(parseFloat(protein)) ? "0" : protein;
  const carboValue = isNaN(parseFloat(carbo)) ? "0" : carbo;
  const fatValue = isNaN(parseFloat(fat)) ? "0" : fat;
  const gainedCaloriesValue = isNaN(parseFloat(gainedCalories))
    ? "0"
    : gainedCalories;
  const handleAddFoodLunch = (FoodIdLunch: any) => {
    dispatch(
      addLunch({
        id: LunchId + 1,
        FoodName: FoodName,
        protein: proteinValue,
        carbo: carboValue,
        fat: fatValue,
        gainedCalories: gainedCaloriesValue,

        FoodIdLunch,
      })
    );
    dispatch(
      addNutriens({
        id: LunchId + 1,
        FoodName: FoodName,
        protein: proteinValue, // Użyj sparsowanej wartości
        carbo: carboValue, // Użyj sparsowanej wartości
        fat: fatValue, // Użyj sparsowanej wartości
        gainedCalories: gainedCaloriesValue, // Użyj sparsowanej wartości
      })
    );
  };
  const [addNewLunch, setAddNewLunch] = useState(false);

  const handleAddNewLunch = () => {
    setAddNewLunch((prev) => !prev);
  };
  const handleDeleteFood = (foodId: number) => {
    const productToDelete = FoodSetLunch.find(
      (product: any) => product.id === foodId
    );
    if (productToDelete) {
      dispatch(deleteNutriens(productToDelete)); // Przekazujemy cały produkt
    }
    dispatch(deleteLunch({ id: foodId }));
  };
  const handleValueChange = (
    event: any,
    setValue: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const value = event.target.value;
    setValue(value === "" || isNaN(parseFloat(value)) ? "0" : value);
  };
  return (
    <>
      <div className="m-6  rounded-lg border-[0.2rem] border-secondary text-lg h-[20rem] ">
        <tr className="bg-third  flex z-10 justify-between  rounded-t-[0.4rem] h-[20%]">
          <td className="p-4">Kolacja</td>
          <motion.div
            layout
            className=" justify-center items-center flex parent m-2 bg-third"
            data-isOpen={addNewLunch}
            style={{
              borderRadius: "0.2rem",
              boxShadow: "0px 10px 30px rgba(0,0,0,0.5)",
            }}
            transition={{
              layout: { duration: 1, type: "spring" },
            }}
          >
            {!addNewLunch && (
              <motion.button
                onClick={() => handleAddNewLunch()}
                className="m-4 "
              >
                <AddIcon />
              </motion.button>
            )}

            {addNewLunch && (
              <>
                {" "}
                <motion.div
                  className="fixed top-0 left-0 right-0 bottom-0  z-50 bg-transparent"
                  onClick={() => handleAddNewLunch()}
                ></motion.div>
                <motion.td colSpan={5} className="block w-full bg-third z-50 ">
                  {" "}
                  <h3 className="m-4">Dodaj produkt</h3>
                  <TextField
                    type="number"
                    id="outlined-basic"
                    label="Produkt"
                    variant="outlined"
                    onChange={(event) => {
                      handleValueChange(event, setProtein);
                    }}
                    className="w-36 m-2"
                  />
                  <TextField
                    type="number"
                    id="outlined-basic"
                    label="Białko"
                    variant="outlined"
                    onChange={(event) => {
                      setProtein(event.target.value);
                    }}
                    className="w-36 m-2"
                  />
                  <TextField
                    type="number"
                    id="outlined-basic"
                    label="Węglodowany"
                    variant="outlined"
                    onChange={(event) => {
                      setCarbo(event.target.value);
                    }}
                    className="w-36 m-2"
                  />
                  <TextField
                    type="number"
                    id="outlined-basic"
                    label="Tłuszcze"
                    variant="outlined"
                    onChange={(event) => {
                      setFat(event.target.value);
                    }}
                    className="w-36 m-2"
                  />
                  <TextField
                    type="number"
                    id="outlined-basic"
                    label="Kcal"
                    variant="outlined"
                    onChange={(event) => {
                      setCalories(event.target.value);
                    }}
                    className="w-36 m-2"
                  />{" "}
                  <Button
                    variant="contained"
                    onClick={() => {
                      handleAddNewLunch();
                      handleAddFoodLunch(FoodSetLunch.id);
                    }}
                    className="m-2 h-14  "
                  >
                    <AddIcon />
                  </Button>
                </motion.td>{" "}
              </>
            )}
          </motion.div>
        </tr>
        {FoodSetLunch.map((foodLunch: any) => {
          return (
            <tr key={foodLunch.id} className="flex">
              <IconButton
                aria-label="delete"
                size="large"
                onClick={() => {
                  handleDeleteFood(foodLunch.id);
                }}
              >
                <DeleteIcon />
              </IconButton>
              <td className="w-[40%] flex justify-center">
                {foodLunch.FoodName}
              </td>
              <td className="w-[15%] flex justify-center">
                {foodLunch.protein}
              </td>
              <td className="w-[20%] flex justify-center">{foodLunch.carbo}</td>
              <td className="w-[15%] flex justify-center">{foodLunch.fat}</td>
              <td className="w-[15%] flex justify-center">
                {foodLunch.totalCalories}
              </td>
            </tr>
          );
        })}{" "}
      </div>
    </>
  );
};
export default Lunch;
