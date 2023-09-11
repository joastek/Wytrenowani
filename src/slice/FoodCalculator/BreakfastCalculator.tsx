import { createSlice, createSelector } from "@reduxjs/toolkit";
import { breakfastSet } from "@/types/type";

export const BreakfastSetSlice = createSlice({
  name: "breakfastSet",
  initialState: { value: [] as breakfastSet[] },
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
          food.series = action.payload.series;
          food.reps = action.payload.reps;
          // food.protein = action.payload.protein;
        }
      });
    },
  },
});

export const { addBreakfast, deleteBreakfast, updateBreakfast } =
  BreakfastSetSlice.actions;

export default BreakfastSetSlice.reducer;
