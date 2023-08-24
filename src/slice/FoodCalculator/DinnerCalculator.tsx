import { createSlice, createSelector } from "@reduxjs/toolkit";
import { FoodSet } from "@/types/type";

export const FoodSetSlice = createSlice({
  name: "foodSet",
  initialState: { value: [] as FoodSet[] },
  reducers: {
    addFood: (state, action) => {
      state.value.push(action.payload);
    },
    deleteFood: (state, action) => {
      state.value = state.value.filter((food) => food.id !== action.payload.id);
    },
    updateFood: (state, action) => {
      state.value.map((food) => {
        if (food.id === action.payload.id) {
          food.FoodName = action.payload.seriesName;
          food.series = action.payload.series;
          food.reps = action.payload.reps;
          // food.protein = action.payload.protein;
        }
      });
    },
  },
});

export const { addFood, deleteFood, updateFood } = FoodSetSlice.actions;

export default FoodSetSlice.reducer;
