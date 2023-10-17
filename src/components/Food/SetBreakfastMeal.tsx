import {
  addBreakfast,
  deleteBreakfast,
} from "@/slice/FoodCalculator/BreakfastCalculator";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { breakfastState } from "@/types/type";
import {
  addNutriens,
  deleteNutriens,
} from "@/slice/FoodCalculator/NutrientsSum";
import { getNutriensFromAPI } from "@/components/API/getNutriensFromAPI";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";

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
  const [writeNameOfNutrien, setwriteNameOfNutrien] = useState("");
  const [writeAmountOfNutrien, setwriteAmountOfNutrien] = useState("");
  const [amountOfNutrien, setAmountOfNutrien] = useState("");
  const [nameOfNutrien, setNameOfNutrien] = useState("");
  const [addNewBreakfast, setAddNewBreakfast] = useState(false);
  const [caloriesNutrien, setCaloriesNutrien] = useState({ gainedCalories: 0 });

  const [proteinNutrien, setProteinNutrien] = useState({ protein: 0 });
  const [carboNutrien, setCarboNutrien] = useState({ carbo: 0 });
  const [fatNutrien, setFatNutrien] = useState({ fat: 0 });

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
        protein: proteinValue,
        carbo: carboValue,
        fat: fatValue,
        gainedCalories: gainedCaloriesValue,
        FoodId,
      })
    );

    dispatch(
      addNutriens({
        id: breakfastId + 1,
        FoodName: FoodName,
        protein: proteinValue,
        carbo: carboValue,
        fat: fatValue,
        gainedCalories: gainedCaloriesValue,
      })
    );
  };

  const handleAddNewBreakfast = () => {
    setAddNewBreakfast((prev) => !prev);
  };

  const handleDeleteFood = (foodId: number) => {
    const productToDelete = FoodSet.find(
      (product: any) => product.id === foodId
    );

    if (productToDelete) {
      const { protein, carbo, fat, gainedCalories } = productToDelete;

      // Create a new object with the values to subtract
      const valuesToSubtract = {
        protein: -parseFloat(protein || "0"),
        carbo: -parseFloat(carbo || "0"),
        fat: -parseFloat(fat || "0"),
        gainedCalories: -parseFloat(gainedCalories || "0"),
      };

      // Dispatch the deleteNutriens action with the values to subtract
      dispatch(deleteNutriens({ id: foodId, ...valuesToSubtract }));
    }
    dispatch(deleteBreakfast({ id: foodId }));
  };

  const handleGetNutriens = async () => {
    const { caloriesNutrien, proteinNutrien, carboNutrien, fatNutrien } =
      await getNutriensFromAPI(writeAmountOfNutrien, writeNameOfNutrien);

    setCaloriesNutrien({ gainedCalories: caloriesNutrien });
    setProteinNutrien({ protein: proteinNutrien });
    setCarboNutrien({ carbo: carboNutrien });
    setFatNutrien({ fat: fatNutrien });

    dispatch(
      addNutriens({
        id: breakfastId + 1,
        FoodName: FoodName,
        protein: proteinNutrien,
        carbo: carboNutrien,
        fat: fatNutrien,
        gainedCalories: caloriesNutrien,
      })
    );
  };

  useEffect(() => {
    setNameOfNutrien(writeNameOfNutrien);
    setAmountOfNutrien(writeAmountOfNutrien);
  }, [writeNameOfNutrien, writeAmountOfNutrien]);

  const handleNameOfNutrienChange = (event: any) => {
    setwriteNameOfNutrien(event.target.value);
  };

  const handleAmountOfNutrien = (event: any) => {
    setwriteAmountOfNutrien(event.target.value);
  };

  return (
    <>
      <div className="m-6 rounded-lg border-[0.2rem] border-secondary text-lg h-[20rem] ">
        <tr className="bg-third flex justify-end rounded-t-[0.4rem] h-[20%] relative">
          <a className="absolute left-0 p-4 z-0">Śniadanie</a>

          <motion.div
            layout
            className="justify-center items-center flex parent m-2 bg-third"
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
                layout="position"
                onClick={() => handleAddNewBreakfast()}
                className="m-4"
              >
                <AddIcon />
              </motion.button>
            )}

            {addNewBreakfast && (
              <>
                {" "}
                <motion.div
                  className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-transparent"
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
                  <div className="w-1/2">
                    {" "}
                    <TextField
                      label="Nazwa składnika"
                      variant="outlined"
                      onChange={handleNameOfNutrienChange}
                      value={writeNameOfNutrien}
                    />
                    <TextField
                      label="Ilość (g)"
                      variant="outlined"
                      onChange={handleAmountOfNutrien}
                      value={writeAmountOfNutrien}
                    />
                    <Button
                      variant="contained"
                      onClick={() => {
                        handleGetNutriens();
                        handleAddFood(FoodSet.id);
                      }}
                      className="m-2 h-14"
                    >
                      <AddIcon />
                    </Button>
                  </div>
                  <div className="w-1/2">
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
                      className="m-2 h-14"
                    >
                      <AddIcon />
                    </Button>{" "}
                  </div>
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
                {foodBreakfast.protein === 0
                  ? foodBreakfast.protein
                  : proteinNutrien.protein}
              </td>
              <td className="w-[20%] flex justify-center">
                {foodBreakfast.carbo === 0
                  ? foodBreakfast.carbo
                  : carboNutrien.carbo}
              </td>
              <td className="w-[15%] flex justify-center">
                {foodBreakfast.fat === 0 ? foodBreakfast.fat : fatNutrien.fat}
              </td>
              <td className="w-[15%] flex justify-center">
                {foodBreakfast.gainedCalories === 0
                  ? foodBreakfast.gainedCalories
                  : caloriesNutrien.gainedCalories}
              </td>
            </tr>
          );
        })}{" "}
      </div>
    </>
  );
};

export default Breakfast;
