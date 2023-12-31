"use client";
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
import { translateText } from "@/app/API/TranslateAPI";
interface FoodProps {
  rest: string;
}

const Breakfast = () => {
  const {
    foodName,
    protein,
    carbo,
    fat,
    gainedCalories,
    writeNameOfNutrien,
    writeAmountOfNutrien,
  } = useSelector((state: breakfastSet) => state.breakfastSet);

  const [textToTranslate, setTextToTranslate] = useState<string>("");
  const [translatedResult, setTranslatedResult] = useState<any>("");

  const translateAndSetNutrientName = async (text: string) => {
    const translatedText = await translateText(text);
    dispatch(setwriteNameOfNutrien(translatedText || text));
    setTranslatedResult(translatedText);
  };

  useEffect(() => {
    if (textToTranslate) {
      translateAndSetNutrientName(textToTranslate);
    }
  }, [textToTranslate]);
  const dispatch = useDispatch();
  const FoodSet = useSelector(
    (state: breakfastState) => state.breakfastSet.value
  );

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
    setwriteNameOfNutrien(textToTranslate);
    setwriteAmountOfNutrien(writeAmountOfNutrien);
  }, [textToTranslate, writeAmountOfNutrien]);

  const handleNameOfNutrienChange = (event: any) => {
    setwriteNameOfNutrien(textToTranslate);
    setTextToTranslate(event.target.value);
    dispatch(setFoodName(textToTranslate)); // Pass textToTranslate instead of event.target.value
  };

  const handleAmountOfNutrien = (event: any) => {
    dispatch(setwriteAmountOfNutrien(event.target.value));
  };

  return (
    <>
      {addNewBreakfast && (
        <>
          <div
            className="  z-[99]  bg-transparent backdrop-blur-md w-full h-full absolute top-0 left-0 "
            onClick={() => {
              handleAddNewBreakfast();
            }}
          ></div>{" "}
          <motion.td
            colSpan={5}
            className="max-w-[70rem]  z-[100]  absolute m-auto bg-contrast p-12 rounded-[1rem] shadow-3xl"
          >
            <h3 className=" z-[100] w-full justify-center mx-auto mb-5 text-center ">
              Dodaj produkt
            </h3>

            <div className="flex sm:block">
              <div className="w-1/2 sm:w-full flex flex-col p-6 bg-bar rounded-[1rem]">
                <p className="text-2xl mb-4">
                  {writeNameOfNutrien}
                  {textToTranslate}
                  Wyszukaj składnik z naszej bazy
                </p>{" "}
                <TextField
                  className="mb-6"
                  label="Nazwa składnika"
                  variant="outlined"
                  onChange={handleNameOfNutrienChange}
                  value={textToTranslate}
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
              </div>{" "}
              <p className=" m-auto justify-center text-center  text-xl mx-4">
                lub
              </p>
              <div className="w-1/2 sm:w-full p-6 bg-contrastblack rounded-[1rem]">
                <p className="text-2xl mb-4"> Wprowadź składnik ręcznie</p>{" "}
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
                <TextField
                  type="number"
                  id="outlined-basic"
                  label="ilość(g)"
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
                  className="m-2 h-14 w-full"
                >
                  <AddIcon />
                </Button>{" "}
              </div>
            </div>
          </motion.td>{" "}
        </>
      )}
      <div className="m-2 rounded-lg border-[0.2rem] border-contrast text-lg h-[20rem]  shadow-3xl">
        <div className="bg-contrast flex justify-end rounded-t-[0.4rem] h-[20%] relative z-[0]">
          <a className="absolute left-0 p-4  z-[-5] text-white">Śniadanie</a>

          <div
            className="justify-center items-center flex  m-2 "
            data-isOpen={addNewBreakfast}
          >
            {!addNewBreakfast && (
              <button onClick={handleAddNewBreakfast} className="m-4">
                <AddIcon />
              </button>
            )}
          </div>
        </div>
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
