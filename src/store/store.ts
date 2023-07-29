// store.ts

import { configureStore } from "@reduxjs/toolkit";
import bmiCalculatorReducer from "@/slice/bodyFatCalculator";
import trainingListReducer from "@/slice/trainingList";
const store = configureStore({
  reducer: {
    bmiCalculator: bmiCalculatorReducer,
    trainingList: trainingListReducer,
  },
});

export default store;
