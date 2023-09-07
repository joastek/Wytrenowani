// store.ts

import { configureStore } from "@reduxjs/toolkit";
import bmiCalculatorReducer from "@/slice/bodyFatCalculator";
import trainingListReducer from "@/slice/trainingList";
import TrainingSetReducer from "@/slice/trainingSet";
import BreakfastSetReducer from "@/slice/FoodCalculator/BreakfastCalculator";
import LunchSetReducer from "@/slice/FoodCalculator/LunchCalculator";
import DinnerSetReducer from "@/slice/FoodCalculator/DinnerCalculator";
import FoodReducer from "@/slice/FoodCalculator/NutrientsSum";
const store = configureStore({
  reducer: {
    bmiCalculator: bmiCalculatorReducer,
    trainingList: trainingListReducer,
    trainingSet: TrainingSetReducer,
    breakfastSet: BreakfastSetReducer,
    lunchSet: LunchSetReducer,
    dinnerSet: DinnerSetReducer,
    nutriensSum: FoodReducer,
  },
});

export default store;
