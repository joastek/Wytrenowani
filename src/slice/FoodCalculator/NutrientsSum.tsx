// nutrientsReducer.js
import { createSlice } from "@reduxjs/toolkit";

const nutrientsSlice = createSlice({
  name: "nutrients",
  initialState: {
    totalProtein: 0,
    totalCarbo: 0,
    totalFat: 0,
    totalCalories: 0,
  },
  reducers: {
    addNutriens: (state, action) => {
      const { protein, carbo, fat, gainedCalories } = action.payload;
      state.totalProtein += parseFloat(protein || 0);
      state.totalCarbo += parseFloat(carbo || 0);
      state.totalFat += parseFloat(fat || 0);
      state.totalCalories += parseFloat(gainedCalories || 0);
    },
    deleteNutriens: (state, action) => {
      const { protein, carbo, fat, gainedCalories } = action.payload;
      state.totalProtein -= parseFloat(protein || 0);
      state.totalCarbo -= parseFloat(carbo || 0);
      state.totalFat -= parseFloat(fat || 0);
      state.totalCalories -= parseFloat(gainedCalories || 0);
    },
  },
});

export const { addNutriens, deleteNutriens } = nutrientsSlice.actions;
export default nutrientsSlice.reducer;
