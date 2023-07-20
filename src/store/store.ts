// store.ts

import { configureStore } from "@reduxjs/toolkit";
import bmiCalculatorReducer from "@/slice/bodyFatCalculator";

const store = configureStore({
  reducer: {
    bmiCalculator: bmiCalculatorReducer,
  },
});

export default store;
