// store.ts

import { configureStore } from "@reduxjs/toolkit";
import bmiCalculatorReducer from "@/slice/bodyFatCalculator";
import trainingListReducer from "@/slice/trainingList";
import TrainingSetReducer from "@/slice/trainingSet";
const store = configureStore({
  reducer: {
    bmiCalculator: bmiCalculatorReducer,
    trainingList: trainingListReducer,
    trainingSet: TrainingSetReducer,
  },
});

export default store;
