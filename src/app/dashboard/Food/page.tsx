"use client";

import {
  addBreakfast,
  deleteBreakfast,
} from "@/slice/FoodCalculator/BreakfastCalculator";
import { addLunch } from "@/slice/FoodCalculator/LunchCalculator";
import { addDinner } from "@/slice/FoodCalculator/DinnerCalculator";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { RootState } from "@/types/type";
import { useState } from "react";
import { breakfastState, lunchState, dinnerState } from "@/types/type";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";

const Food = () => {
  const dispatch = useDispatch();
  // const FoodList = useSelector((state: FoodState) => state.FoodList.value);
  const FoodSet = useSelector(
    (state: breakfastState) => state.breakfastSet.value
  );
  const FoodSetLunch = useSelector((state: lunchState) => state.lunchSet.value);
  const FoodSetDinner = useSelector(
    (state: dinnerState) => state.dinnerSet.value
  );
  const { calories } = useSelector((state: RootState) => state.bmiCalculator);
  const [FoodName, setFoodName] = useState("");
  const [protein, setProtein] = useState("");
  const [carbo, setCarbo] = useState("");
  const [fat, setFat] = useState("");
  const [gainedCalories, setCalories] = useState("");

  const handleAddFood = (FoodId: any) => {
    const breakfastId = FoodSet.length > 0 ? FoodSet[FoodSet.length - 1].id : 0;
    dispatch(
      addBreakfast({
        breakfastid: breakfastId,
        FoodName: FoodName,
        protein: protein,
        carbo: carbo,
        fat: fat,
        gainedCalories: gainedCalories,

        FoodId,
      })
    );
  };
  /////dinner
  const [FoodNameDinner, setFoodNameDinner] = useState("");
  const [proteinDinner, setProteinDinner] = useState("");
  const [carboDinner, setCarboDinner] = useState("");
  const [fatDinner, setFatDinner] = useState("");
  const [caloriesDinner, setCaloriesDinner] = useState("");
  const handleAddFoodDinner = (FoodIdDinner: any) => {
    const DinnerId =
      FoodSetDinner.length > 0 ? FoodSetDinner[FoodSetDinner.length - 1].id : 0;
    dispatch(
      addDinner({
        Dinnerid: DinnerId,
        FoodNameDinner: FoodNameDinner,
        proteinDinner: proteinDinner,
        carboDinner: carboDinner,
        fatDinner: fatDinner,
        caloriesDinner: caloriesDinner,

        FoodIdDinner,
      })
    );
  };
  ///dinner
  const [FoodNameLunch, setFoodNameLunch] = useState("");
  const [proteinLunch, setProteinLunch] = useState("");
  const [carboLunch, setCarboLunch] = useState("");
  const [fatLunch, setFatLunch] = useState("");
  const [caloriesLunch, setCaloriesLunch] = useState("");
  const handleAddFoodLunch = (FoodIdLunch: any) => {
    const LunchId =
      FoodSetLunch.length > 0 ? FoodSetLunch[FoodSetLunch.length - 1].id : 0;
    dispatch(
      addLunch({
        LunchId: LunchId,
        FoodNameLunch: FoodNameLunch,
        proteinLunch: proteinLunch,
        carboLunch: carboLunch,
        fatLunch: fatLunch,
        caloriesLunch: caloriesLunch,

        FoodIdLunch,
      })
    );
  };
  let totalProtein = 0;
  let totalCarbo = 0;
  let totalFat = 0;
  let totalCalories = 0;

  ///popups
  const [addNewBreakfast, setAddNewBreakfast] = useState(false);
  const [addNewDinner, setAddNewDinner] = useState(false);
  const [addNewLunch, setAddNewLunch] = useState(false);
  const handleAddNewBreakfast = () => {
    setAddNewBreakfast((prev) => !prev);
  };
  const handleAddNewDinner = () => {
    setAddNewDinner((prev) => !prev);
  };
  const handleAddNewLunch = () => {
    setAddNewLunch((prev) => !prev);
  };
  return (
    <>
      <div className="flex justify-center items-center  flex-col ">
        <div className="w-[70rem] justify-center items-center relative">
          <table className="  m-12  w-full bg-bar rounded-lg p-12 ">
            <thead className="">
              <tr className="flex m-6 p-4 rounded-lg border-[0.4rem] border-secondary text-lg ">
                <th style={{ width: "40%" }} className="font-light">
                  <h2>Produkt</h2>
                </th>
                <th style={{ width: "15%" }} className="font-light">
                  <h2>Białko</h2>
                </th>
                <th style={{ width: "20%" }} className="font-light">
                  <h2>Węglowoadny</h2>
                </th>
                <th style={{ width: "15%" }} className="font-light">
                  <h2>Tłuszcze</h2>
                </th>
                <th style={{ width: "15%" }} className="font-light">
                  <h2>Kcal</h2>
                </th>
              </tr>
            </thead>

            <tbody>
              <div className="overflow-y-auto h-[45rem]">
                <div className="m-6  rounded-lg border-[0.2rem] border-secondary text-lg h-[20rem] ">
                  <tr className="bg-third  flex z-10 justify-between  rounded-t-[0.4rem] h-[20%]">
                    <td className="p-4">Śniadanie</td>
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
                            className="block w-full bg-third z-50 "
                          >
                            {" "}
                            <h3 className="m-4">Dodaj produkt</h3>
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
                  {FoodSet.map((foodBreakfast: any, index: number) => {
                    totalProtein += parseFloat(foodBreakfast.protein || 0);
                    totalCarbo += parseFloat(foodBreakfast.carbo || 0);
                    totalFat += parseFloat(foodBreakfast.fat || 0);
                    totalCalories += parseFloat(
                      foodBreakfast.gainedCalories || 0
                    );
                    const isEven = index % 2 === 0;
                    const rowClass = isEven ? "bg-bar" : "";
                    return (
                      <tr key={foodBreakfast.id} className="flex">
                        <td className="w-[40%] flex justify-center">
                          {foodBreakfast.FoodName}
                        </td>
                        <td className="w-[15%] flex justify-center">
                          {foodBreakfast.protein}
                        </td>
                        <td className="w-[20%] flex justify-center">
                          {foodBreakfast.carbo}
                        </td>
                        <td className="w-[15%] flex justify-center">
                          {foodBreakfast.fat}
                        </td>
                        <td className="w-[15%] flex justify-center">
                          {foodBreakfast.calories}
                        </td>
                      </tr>
                    );
                  })}{" "}
                </div>
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
                          <motion.td
                            colSpan={5}
                            className="block w-full bg-third z-50 "
                          >
                            {" "}
                            <h3 className="m-4">Dodaj produkt</h3>
                            <Button
                              variant="contained"
                              onClick={() => {
                                handleAddNewDinner();
                                handleAddFoodDinner(FoodSet.id);
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
                                setFoodNameDinner(event.target.value);
                              }}
                              className="w-36 m-2"
                            />
                            <TextField
                              id="outlined-basic"
                              label="Białko"
                              variant="outlined"
                              onChange={(event) => {
                                setProteinDinner(event.target.value);
                              }}
                              className="w-36 m-2"
                            />
                            <TextField
                              id="outlined-basic"
                              label="Węglodowany"
                              variant="outlined"
                              onChange={(event) => {
                                setCarboDinner(event.target.value);
                              }}
                              className="w-36 m-2"
                            />
                            <TextField
                              id="outlined-basic"
                              label="Tłuszcze"
                              variant="outlined"
                              onChange={(event) => {
                                setFatDinner(event.target.value);
                              }}
                              className="w-36 m-2"
                            />
                            <TextField
                              id="outlined-basic"
                              label="Kcal"
                              variant="outlined"
                              onChange={(event) => {
                                setCaloriesDinner(event.target.value);
                              }}
                              className="w-36 m-2"
                            />{" "}
                          </motion.td>{" "}
                        </>
                      )}
                    </motion.div>
                  </tr>
                  {FoodSetDinner.map((foodDinner: any, index: number) => {
                    totalProtein += parseFloat(foodDinner.protein || 0);
                    totalCarbo += parseFloat(foodDinner.carbo || 0);
                    totalFat += parseFloat(foodDinner.fat || 0);
                    totalCalories += parseFloat(foodDinner.gainedCalories || 0);
                    const isEven = index % 2 === 0;
                    const rowClass = isEven ? "bg-bar" : "";
                    return (
                      <tr key={foodDinner.DinnerId} className="flex">
                        <td className="w-[40%] flex justify-center">
                          {foodDinner.FoodNameDinner}
                        </td>
                        <td className="w-[15%] flex justify-center">
                          {foodDinner.proteinDinner}
                        </td>
                        <td className="w-[20%] flex justify-center">
                          {foodDinner.carboDinner}
                        </td>
                        <td className="w-[15%] flex justify-center">
                          {foodDinner.fatDinner}
                        </td>
                        <td className="w-[15%] flex justify-center">
                          {foodDinner.caloriesDinnerDinner}
                        </td>
                      </tr>
                    );
                  })}{" "}
                </div>
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
                          // variant="contained"
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
                          <motion.td
                            colSpan={5}
                            className="block w-full bg-third z-50 "
                          >
                            {" "}
                            <h3 className="m-4">Dodaj produkt</h3>
                            <Button
                              variant="contained"
                              onClick={() => {
                                handleAddNewLunch();
                                handleAddFoodLunch(FoodSet.id);
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
                                setFoodNameLunch(event.target.value);
                              }}
                              className="w-36 m-2"
                            />
                            <TextField
                              id="outlined-basic"
                              label="Białko"
                              variant="outlined"
                              onChange={(event) => {
                                setProteinLunch(event.target.value);
                              }}
                              className="w-36 m-2"
                            />
                            <TextField
                              id="outlined-basic"
                              label="Węglodowany"
                              variant="outlined"
                              onChange={(event) => {
                                setCarboLunch(event.target.value);
                              }}
                              className="w-36 m-2"
                            />
                            <TextField
                              id="outlined-basic"
                              label="Tłuszcze"
                              variant="outlined"
                              onChange={(event) => {
                                setFatLunch(event.target.value);
                              }}
                              className="w-36 m-2"
                            />
                            <TextField
                              id="outlined-basic"
                              label="Kcal"
                              variant="outlined"
                              onChange={(event) => {
                                setCaloriesLunch(event.target.value);
                              }}
                              className="w-36 m-2"
                            />{" "}
                          </motion.td>{" "}
                        </>
                      )}
                    </motion.div>
                  </tr>
                  {FoodSetLunch.map((foodDinner: any, index: number) => {
                    totalProtein += parseFloat(foodDinner.protein || 0);
                    totalCarbo += parseFloat(foodDinner.carbo || 0);
                    totalFat += parseFloat(foodDinner.fat || 0);
                    totalCalories += parseFloat(foodDinner.gainedCalories || 0);
                    const isEven = index % 2 === 0;
                    const rowClass = isEven ? "bg-bar" : "";
                    return (
                      <tr key={foodDinner.id} className="flex">
                        <td className="w-[40%] flex justify-center">
                          {foodDinner.FoodNameLunch}
                        </td>
                        <td className="w-[15%] flex justify-center">
                          {foodDinner.proteinLunch}
                        </td>
                        <td className="w-[20%] flex justify-center">
                          {foodDinner.carboLunch}
                        </td>
                        <td className="w-[15%] flex justify-center">
                          {foodDinner.fatLunch}
                        </td>
                        <td className="w-[15%] flex justify-center">
                          {foodDinner.caloriesLunch}
                        </td>
                      </tr>
                    );
                  })}{" "}
                </div>
              </div>
            </tbody>
          </table>
        </div>

        <div className="flex justify-center  w-[70rem]  items-stretch">
          <div className="w-1/2  bg-bar m-6">
            {" "}
            <p>
              Suma kcal: {totalCalories}/{calories} kcal
            </p>
          </div>
          <div className="w-1/2  bg-bar">
            {" "}
            <p>Suma białka: {totalProtein} g</p>
            <p>Suma wegli: {totalCarbo} g</p>
            <p>Suma tłuszczy: {totalFat} g</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Food;
