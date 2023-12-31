import { createSlice, createSelector } from "@reduxjs/toolkit";
import { lunchSet } from "@/types/type";

export const DinnerSetSlice = createSlice({
  name: "dinnertSet",
  initialState: { value: [] as lunchSet[] },
  reducers: {
    addDinner: (state, action) => {
      state.value.push(action.payload);
    },
    deleteDinner: (state, action) => {
      state.value = state.value.filter((food) => food.id !== action.payload.id);
    },
    updateDinner: (state, action) => {
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

export const { addDinner, deleteDinner, updateDinner } = DinnerSetSlice.actions;

export default DinnerSetSlice.reducer;
