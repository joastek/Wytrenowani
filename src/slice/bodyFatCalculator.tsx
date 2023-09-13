import { createSlice } from "@reduxjs/toolkit";
import { BMIState } from "@/types/type";
const initialState: BMIState = {
  mass: 0,
  height: 0,
  gender: 1,
  age: 0,
  result: 0,
  progress: 0,
  activity: 1.4,
  calories: 0,
};

const bmiCalculatorSlice = createSlice({
  name: "bmiCalculator",
  initialState,
  reducers: {
    setMass: (state, action) => {
      state.mass = action.payload;
    },
    setHeight: (state, action) => {
      state.height = action.payload;
    },
    setGender: (state, action) => {
      state.gender = action.payload;
    },
    setAge: (state, action) => {
      state.age = action.payload;
    },
    setActivity: (state, action) => {
      state.activity = action.payload;
    },
    calculateResult: (state) => {
      const { mass, height, gender, age, activity } = state;
      const calculateBMI = () => {
        if (mass && height) {
          const heightInMeters = height / 100;
          const bmi = mass / (heightInMeters * heightInMeters);
          return bmi.toFixed(2);
        }
        return "";
      };

      if (mass && height && age) {
        const result =
          1.39 * parseFloat(calculateBMI()) + 0.16 * age - 10.34 * gender - 9;
        const mappedResult = Math.min(Math.max(0, result + 10));
        state.result = parseFloat(result.toFixed(2));
        state.progress = mappedResult;
        const calories = activity * result * 100;
        state.calories = Math.round(calories);
      } else {
        state.result = 0;
        state.progress = 0;
      }
    },
  },
});

export const {
  setMass,
  setHeight,
  setGender,
  setAge,
  calculateResult,
  setActivity,
} = bmiCalculatorSlice.actions;

export default bmiCalculatorSlice.reducer;
