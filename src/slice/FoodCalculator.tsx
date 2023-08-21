import { createSlice } from "@reduxjs/toolkit";
import { FoodSet } from "@/types/type";

export const FoodCalculatorSlice = createSlice({
  name: "FoodSet",
  initialState: { value: [] as FoodSet[] },
  reducers: {
    addFood: (state, action) => {
      state.value.push(action.payload);
    },
    deleteFood: (state, action) => {
      state.value = state.value.filter((user) => user.id !== action.payload.id);
    },
    updateFood: (state, action) => {
      state.value.map((user) => {
        if (user.id === action.payload.id) {
          user.FoodName = action.payload.seriesName;
          user.series = action.payload.series;
          user.reps = action.payload.reps;
        }
      });
    },
  },
});
export const { addFood, deleteFood, updateFood } = FoodCalculatorSlice.actions;
export default FoodCalculatorSlice.reducer;
