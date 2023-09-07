"use client";
import { addLunch } from "@/slice/FoodCalculator/LunchCalculator";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { useState } from "react";
import { lunchState } from "@/types/type";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import { addNutriens } from "@/slice/FoodCalculator/NutrientsSum";

const Lunch = () => {
  const dispatch = useDispatch();
  const FoodSetLunch = useSelector((state: lunchState) => state.lunchSet.value);
  const [FoodName, setFoodName] = useState("");
  const [protein, setProtein] = useState("");
  const [carbo, setCarbo] = useState("");
  const [fat, setFat] = useState("");
  const [gainedCalories, setCalories] = useState("");
  const handleAddFoodLunch = (FoodIdLunch: any) => {
    const LunchId =
      FoodSetLunch.length > 0 ? FoodSetLunch[FoodSetLunch.length - 1].id : 0;
    dispatch(
      addLunch({
        LunchId: LunchId,
        FoodName: FoodName,
        protein: protein,
        carbo: carbo,
        fat: fat,
        gainedCalories: gainedCalories,

        FoodIdLunch,
      })
    );
    const lunchData = {
      FoodName,
      protein,
      carbo,
      fat,
      gainedCalories,
    };
    dispatch(addNutriens(lunchData));
  };
  const [addNewLunch, setAddNewLunch] = useState(false);

  const handleAddNewLunch = () => {
    setAddNewLunch((prev) => !prev);
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
                    id="outlined-basic"
                    label="Białko"
                    variant="outlined"
                    onChange={(event) => {
                      setProtein(event.target.value);
                    }}
                    className="w-36 m-2"
                  />
                  <TextField
                    id="outlined-basic"
                    label="Węglodowany"
                    variant="outlined"
                    onChange={(event) => {
                      setCarbo(event.target.value);
                    }}
                    className="w-36 m-2"
                  />
                  <TextField
                    id="outlined-basic"
                    label="Tłuszcze"
                    variant="outlined"
                    onChange={(event) => {
                      setFat(event.target.value);
                    }}
                    className="w-36 m-2"
                  />
                  <TextField
                    id="outlined-basic"
                    label="Kcal"
                    variant="outlined"
                    onChange={(event) => {
                      setCalories(event.target.value);
                    }}
                    className="w-36 m-2"
                  />{" "}
                </motion.td>{" "}
              </>
            )}
          </motion.div>
        </tr>
        {FoodSetLunch.map((foodDinner: any) => {
          return (
            <tr key={foodDinner.id} className="flex">
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
                {foodDinner.totalCalories}
              </td>
            </tr>
          );
        })}{" "}
      </div>
    </>
  );
};
export default Lunch;
