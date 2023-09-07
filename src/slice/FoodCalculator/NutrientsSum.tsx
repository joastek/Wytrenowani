// nutrientsReducer.js
import { createSlice } from '@reduxjs/toolkit';

const nutrientsSlice = createSlice({
  name: 'nutrients',
  initialState: {
    totalProtein: 0,
    totalCarbo: 0,
    totalFat: 0,
    totalCalories: 0,
  },
  reducers: {
    addNutriens: (state, action) => {
      // Tutaj oblicz sumaryczne wartości odżywcze na podstawie danych jedzenia z akcji
      const { protein, carbo, fat, gainedCalories } = action.payload;
      state.totalProtein += parseFloat(protein || 0);
      state.totalCarbo += parseFloat(carbo || 0);
      state.totalFat += parseFloat(fat || 0);
      state.totalCalories += parseFloat(gainedCalories || 0);
    },
  },
});

export const { addNutriens } = nutrientsSlice.actions;
export default nutrientsSlice.reducer;
