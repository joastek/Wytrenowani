import {
  addBreakfast,
  deleteBreakfast,
} from "@/slice/FoodCalculator/BreakfastCalculator";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { useState } from "react";
import { breakfastState } from "@/types/type";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import {
  addNutriens,
  deleteNutriens,
} from "@/slice/FoodCalculator/NutrientsSum";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
const Breakfast = () => {
  const dispatch = useDispatch();

  const FoodSet = useSelector(
    (state: breakfastState) => state.breakfastSet.value
  );

  const [FoodName, setFoodName] = useState("");
  const [protein, setProtein] = useState("");
  const [carbo, setCarbo] = useState("");
  const [fat, setFat] = useState("");
  const [gainedCalories, setCalories] = useState("");
  const breakfastId = FoodSet.length > 0 ? FoodSet[FoodSet.length - 1].id : 0;
  const proteinValue = isNaN(parseFloat(protein)) ? "0" : protein;
  const carboValue = isNaN(parseFloat(carbo)) ? "0" : carbo;
  const fatValue = isNaN(parseFloat(fat)) ? "0" : fat;
  const gainedCaloriesValue = isNaN(parseFloat(gainedCalories))
    ? "0"
    : gainedCalories;

  const handleAddFood = (FoodId: any) => {
    dispatch(
      addBreakfast({
        id: breakfastId + 1,
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
        id: breakfastId + 1,
        FoodName: FoodName,
        protein: proteinValue, // Użyj sparsowanej wartości
        carbo: carboValue, // Użyj sparsowanej wartości
        fat: fatValue, // Użyj sparsowanej wartości
        gainedCalories: gainedCaloriesValue, // Użyj sparsowanej wartości
      })
    );
  };

  const [addNewBreakfast, setAddNewBreakfast] = useState(false);
  const handleAddNewBreakfast = () => {
    setAddNewBreakfast((prev) => !prev);
  };

  /////
  const handleDeleteFood = (foodId: number) => {
    const productToDelete = FoodSet.find(
      (product: any) => product.id === foodId
    );
    if (productToDelete) {
      dispatch(deleteNutriens(productToDelete)); // Przekazujemy cały produkt
    }
    dispatch(deleteBreakfast({ id: foodId }));
  };

  return (
    <>
      <div className="m-6  rounded-lg border-[0.2rem] border-secondary text-lg h-[20rem] ">
        <tr className="bg-third  flex  justify-end rounded-t-[0.4rem] h-[20%] relative">
          <a className="absolute left-0 p-4 z-0">Śniadanie</a>
          <motion.div
            layout
            className=" justify-center items-center flex parent m-2 bg-third"
            data-isOpen={addNewBreakfast}
            style={{
              borderRadius: "0.2rem",
              boxShadow: "0px 10px 30px rgba(0,0,0,0.5)",
            }}
            transition={{
              layout: { duration: 1, type: "spring" },
            }}
          >
            {!addNewBreakfast && (
              <motion.button
                // variant="contained"
                layout="position"
                onClick={() => handleAddNewBreakfast()}
                className="m-4 "
              >
                <AddIcon />
              </motion.button>
            )}

            {addNewBreakfast && (
              <>
                {" "}
                <motion.div
                  className="fixed top-0 left-0 right-0 bottom-0  z-50 bg-transparent"
                  onClick={() => handleAddNewBreakfast()}
                ></motion.div>
                <motion.td
                  colSpan={5}
                  className="w-full bg-third z-50  "
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  {" "}
                  <h3 className="m-4">Dodaj produkt</h3>
                  <TextField
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
                      handleAddNewBreakfast();
                      handleAddFood(FoodSet.id);
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
        {FoodSet.map((foodBreakfast: any, index: number) => {
          return (
            <tr key={foodBreakfast.id} className="flex items-center">
              <IconButton
                aria-label="delete"
                size="large"
                onClick={() => {
                  handleDeleteFood(foodBreakfast.id);
                }}
              >
                <DeleteIcon />
              </IconButton>
              <td className="w-[32%] flex justify-center">
                {foodBreakfast.FoodName}
              </td>
              <td className="w-[18%] flex justify-center">
                {foodBreakfast.protein}
              </td>
              <td className="w-[20%] flex justify-center">
                {foodBreakfast.carbo}
              </td>
              <td className="w-[15%] flex justify-center">
                {foodBreakfast.fat}
              </td>
              <td className="w-[15%] flex justify-center">
                {foodBreakfast.gainedCalories}
              </td>
            </tr>
          );
        })}{" "}
      </div>
    </>
  );
};

export default Breakfast;
