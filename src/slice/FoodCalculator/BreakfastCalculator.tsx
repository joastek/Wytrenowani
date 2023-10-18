import { createSlice } from "@reduxjs/toolkit";
import { breakfastSet } from "@/types/type";

const initialState = {
  value: [] as breakfastSet[],
  foodName: "",
  protein: 0,
  carbo: 0,
  fat: 0,
  gainedCalories: 0,
  writeNameOfNutrien: "",
  writeAmountOfNutrien: "",
};

export const BreakfastSetSlice = createSlice({
  name: "breakfastSet",
  initialState,
  reducers: {
    addBreakfast: (state, action) => {
      state.value.push(action.payload);
    },
    deleteBreakfast: (state, action) => {
      const idToDelete = action.payload.id;
      state.value = state.value.filter((food) => food.id !== idToDelete);
    },
    updateBreakfast: (state, action) => {
      state.value.map((food) => {
        if (food.id === action.payload.id) {
          food.FoodName = action.payload.seriesName;
          food.protein = action.payload.protein;
          food.carbo = action.payload.carbo;
          food.fat = action.payload.fat;
          food.calories = action.payload.calories;
        }
      });
    },
    setFoodName: (state, action) => {
      state.foodName = action.payload;
    },
    setProtein: (state, action) => {
      state.protein = action.payload;
    },
    setCarbo: (state, action) => {
      state.carbo = action.payload;
    },
    setFat: (state, action) => {
      state.fat = action.payload;
    },
    setCalories: (state, action) => {
      state.gainedCalories = action.payload;
    },
    setwriteNameOfNutrien: (state, action) => {
      state.writeNameOfNutrien = action.payload;
    },
    setwriteAmountOfNutrien: (state, action) => {
      state.writeAmountOfNutrien = action.payload;
    },
  },
});

export const {
  addBreakfast,
  deleteBreakfast,
  updateBreakfast,
  setFoodName,
  setProtein,
  setCarbo,
  setFat,
  setCalories,
  setwriteNameOfNutrien,
  setwriteAmountOfNutrien,
} = BreakfastSetSlice.actions;

export default BreakfastSetSlice.reducer;
