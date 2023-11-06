import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { Button, TextField, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { getNutriensFromAPI } from "@/app/API/getNutriensFromAPI";
import {
  addBreakfast,
  deleteBreakfast,
  setFoodName,
  setProtein,
  setCarbo,
  setFat,
  setCalories,
  setwriteNameOfNutrien,
  setwriteAmountOfNutrien,
} from "@/slice/FoodCalculator/BreakfastCalculator";
import {
  addNutriens,
  deleteNutriens,
} from "@/slice/FoodCalculator/NutrientsSum";
import { breakfastState, breakfastSet } from "@/types/type";

const Breakfast = () => {
  const dispatch = useDispatch();
  const FoodSet = useSelector(
    (state: breakfastState) => state.breakfastSet.value
  );
  const {
    foodName,
    protein,
    carbo,
    fat,
    gainedCalories,
    writeNameOfNutrien,
    writeAmountOfNutrien,
  } = useSelector((state: breakfastSet) => state.breakfastSet);

  const [addNewBreakfast, setAddNewBreakfast] = useState(false);

  const breakfastId = FoodSet.length > 0 ? FoodSet[FoodSet.length - 1].id : 0;

  const handleAddFood = (FoodId: any) => {
    dispatch(
      addBreakfast({
        id: breakfastId + 1,
        FoodName: foodName,
        protein: protein,
        carbo: carbo,
        fat: fat,
        gainedCalories: gainedCalories,
        FoodId,
      })
    );

    dispatch(
      addNutriens({
        id: breakfastId + 1,
        FoodName: foodName,
        protein: protein,
        carbo: carbo,
        fat: fat,
        gainedCalories: gainedCalories,
      })
    );
  };

  const handleAddNewBreakfast = () => {
    dispatch(setwriteNameOfNutrien(""));
    dispatch(setwriteAmountOfNutrien(0));
    setAddNewBreakfast((prev) => !prev);
  };

  const handleDeleteFood = (foodId: number) => {
    dispatch(deleteNutriens({ id: foodId }));
    dispatch(deleteBreakfast({ id: foodId }));
  };

  const handleGetNutriens = async () => {
    const { caloriesNutrien, proteinNutrien, carboNutrien, fatNutrien } =
      await getNutriensFromAPI(writeAmountOfNutrien, writeNameOfNutrien);

    setCalories({ gainedCalories: caloriesNutrien });
    setProtein({ protein: protein });
    setCarbo({ carbo: carboNutrien });
    setFat({ fat: fatNutrien });

    dispatch(
      addNutriens({
        id: breakfastId + 1,
        FoodName: writeNameOfNutrien,
        protein: proteinNutrien,
        carbo: carboNutrien,
        fat: fatNutrien,
        gainedCalories: caloriesNutrien,
      })
    );
    dispatch(
      addBreakfast({
        id: breakfastId + 1,
        FoodName: writeNameOfNutrien,
        protein: proteinNutrien,
        carbo: carboNutrien,
        fat: fatNutrien,
        gainedCalories: caloriesNutrien,
      })
    );
  };

  useEffect(() => {
    setwriteNameOfNutrien(writeNameOfNutrien);
    setwriteAmountOfNutrien(writeAmountOfNutrien);
  }, [writeNameOfNutrien, writeAmountOfNutrien]);

  const handleNameOfNutrienChange = (event: any) => {
    dispatch(setwriteNameOfNutrien(event.target.value));
  };

  const handleAmountOfNutrien = (event: any) => {
    dispatch(setwriteAmountOfNutrien(event.target.value));
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
                onClick={handleAddNewBreakfast}
                className="m-4"
              >
                <AddIcon />
              </motion.button>
            )}

            {addNewBreakfast && (
              <>
                {" "}
                <div className="w-[40rem]">
                  <motion.div
                    className="fixed top-0 left-0 z-10 bg-transparent"
                    onClick={() => {
                      handleAddNewBreakfast(), handleGetNutriens();
                    }}
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
                          handleAddNewBreakfast(), handleGetNutriens();
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
                          dispatch(setFoodName(event.target.value));
                        }}
                        className="w-36 m-2"
                      />
                      <TextField
                        type="number"
                        id="outlined-basic"
                        label="Białko"
                        variant="outlined"
                        onChange={(event) => {
                          dispatch(setProtein(event.target.value));
                        }}
                        className="w-36 m-2"
                      />
                      <TextField
                        type="number"
                        id="outlined-basic"
                        label="Węglodowany"
                        variant="outlined"
                        onChange={(event) => {
                          dispatch(setCarbo(event.target.value));
                        }}
                        className="w-36 m-2"
                      />
                      <TextField
                        type="number"
                        id="outlined-basic"
                        label="Tłuszcze"
                        variant="outlined"
                        onChange={(event) => {
                          dispatch(setFat(event.target.value));
                        }}
                        className="w-36 m-2"
                      />
                      <TextField
                        type="number"
                        id="outlined-basic"
                        label="Kcal"
                        variant="outlined"
                        onChange={(event) => {
                          dispatch(setCalories(event.target.value));
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
                </div>{" "}
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
