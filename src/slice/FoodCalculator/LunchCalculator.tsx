import { createSlice, createSelector } from "@reduxjs/toolkit";
import { lunchSet } from "@/types/type";

export const LunchSetSlice = createSlice({
  name: "breakfastSet",
  initialState: { value: [] as lunchSet[] },
  reducers: {
    addLunch: (state, action) => {
      state.value.push(action.payload);
    },
    deleteLunch: (state, action) => {
      state.value = state.value.filter((food) => food.id !== action.payload.id);
    },
    updateLunch: (state, action) => {
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

export const { addLunch, deleteLunch, updateLunch } = LunchSetSlice.actions;

export default LunchSetSlice.reducer;
