"use client";
import {
  addDinner,
  deleteDinner,
} from "@/slice/FoodCalculator/DinnerCalculator";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { useState } from "react";
import { dinnerState } from "@/types/type";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import {
  addNutriens,
  deleteNutriens,
} from "@/slice/FoodCalculator/NutrientsSum";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
const Dinner = () => {
  const dispatch = useDispatch();
  const FoodSetDinner = useSelector(
    (state: dinnerState) => state.dinnerSet.value
  );
  const [FoodName, setFoodName] = useState("");
  const [protein, setProtein] = useState("");
  const [carbo, setCarbo] = useState("");
  const [fat, setFat] = useState("");
  const [gainedCalories, setCalories] = useState("");
  const [addNewDinner, setAddNewDinner] = useState(false);
  const DinnerId =
    FoodSetDinner.length > 0 ? FoodSetDinner[FoodSetDinner.length - 1].id : 0;
  const proteinValue = isNaN(parseFloat(protein)) ? "0" : protein;
  const carboValue = isNaN(parseFloat(carbo)) ? "0" : carbo;
  const fatValue = isNaN(parseFloat(fat)) ? "0" : fat;
  const gainedCaloriesValue = isNaN(parseFloat(gainedCalories))
    ? "0"
    : gainedCalories;
  const handleAddFoodDinner = (FoodId: any) => {
    dispatch(
      addDinner({
        id: DinnerId + 1,
        FoodName: FoodName,
        protein: proteinValue, // Użyj sparsowanej wartości
        carbo: carboValue, // Użyj sparsowanej wartości
        fat: fatValue, // Użyj sparsowanej wartości
        gainedCalories: gainedCaloriesValue, // Użyj sparsowanej wartości
        FoodId,
      })
    );

    dispatch(
      addNutriens({
        id: DinnerId + 1,
        FoodName: FoodName,
        protein: proteinValue, // Użyj sparsowanej wartości
        carbo: carboValue, // Użyj sparsowanej wartości
        fat: fatValue, // Użyj sparsowanej wartości
        gainedCalories: gainedCaloriesValue, // Użyj sparsowanej wartości
      })
    );
  };

  const handleAddNewDinner = () => {
    setAddNewDinner((prev) => !prev);
  };
  const handleDeleteFood = (foodId: number) => {
    const productToDelete = FoodSetDinner.find(
      (product: any) => product.id === foodId
    );
    if (productToDelete) {
      dispatch(deleteNutriens(productToDelete)); // Przekazujemy cały produkt
    }
    dispatch(deleteDinner({ id: foodId }));
  };
  return (
    <>
      {" "}
      <div className="m-6  rounded-lg border-[0.2rem] border-secondary text-lg h-[20rem] ">
        <tr className="bg-third  flex z-10 justify-between  rounded-t-[0.4rem] h-[20%]">
          <td className="p-4">Obiad</td>
          <motion.div
            layout
            className=" justify-center items-center flex parent m-2 bg-third"
            data-isOpen={addNewDinner}
            style={{
              borderRadius: "0.2rem",
              boxShadow: "0px 10px 30px rgba(0,0,0,0.5)",
            }}
            transition={{
              layout: { duration: 1, type: "spring" },
            }}
          >
            {!addNewDinner && (
              <motion.button
                // variant="contained"
                onClick={() => handleAddNewDinner()}
                className="m-4 "
              >
                <AddIcon />
              </motion.button>
            )}

            {addNewDinner && (
              <>
                {" "}
                <motion.div
                  className="fixed top-0 left-0 right-0 bottom-0  z-50 bg-transparent"
                  onClick={() => handleAddNewDinner()}
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
                      setFoodName(event.target.value);
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
                      handleAddNewDinner();
                      handleAddFoodDinner(FoodSetDinner.id);
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
        {FoodSetDinner.map((foodDinner: any) => {
          return (
            <tr key={foodDinner.Id} className="flex">
              <IconButton
                aria-label="delete"
                size="large"
                onClick={() => {
                  handleDeleteFood(foodDinner.id);
                }}
              >
                <DeleteIcon />
              </IconButton>
              <td className="w-[40%] flex justify-center">
                {foodDinner.FoodName}
              </td>
              <td className="w-[15%] flex justify-center">
                {foodDinner.protein}
              </td>
              <td className="w-[20%] flex justify-center">
                {foodDinner.carbo}
              </td>
              <td className="w-[15%] flex justify-center">{foodDinner.fat}</td>
              <td className="w-[15%] flex justify-center">
                {foodDinner.gainedCalories}
              </td>
            </tr>
          );
        })}{" "}
      </div>
    </>
  );
};

export default Dinner;
