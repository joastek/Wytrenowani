// store.ts

import { configureStore } from "@reduxjs/toolkit";
import bmiCalculatorReducer from "@/slice/Calculator/bodyFatCalculator";
import trainingListReducer from "@/slice/Training/trainingList";
import TrainingSetReducer from "@/slice/Training/trainingSet";
import BreakfastSetReducer from "@/slice/FoodCalculator/BreakfastCalculator";
import LunchSetReducer from "@/slice/FoodCalculator/LunchCalculator";
import DinnerSetReducer from "@/slice/FoodCalculator/DinnerCalculator";
import FoodReducer from "@/slice/FoodCalculator/NutrientsSum";
import GlassOfWaterReducer from "@/slice/Dashboard/numberOfGlasses";
import NumberOfStepsReducer from "@/slice/Dashboard/numberOfSteps";
import weatherData from "@/slice/Dashboard/weatherData";

const store = configureStore({
  reducer: {
    bmiCalculator: bmiCalculatorReducer,
    trainingList: trainingListReducer,
    trainingSet: TrainingSetReducer,
    breakfastSet: BreakfastSetReducer,
    lunchSet: LunchSetReducer,
    dinnerSet: DinnerSetReducer,
    nutriensSum: FoodReducer,
    glassOfWater: GlassOfWaterReducer,
    stepsNumber: NumberOfStepsReducer,
    weather: weatherData,
  },
});

export default store;
