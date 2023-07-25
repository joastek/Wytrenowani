import { createSlice } from "@reduxjs/toolkit";
import { BMIState } from "@/types/type";
const initialState: BMIState = {
  mass: null,
  height: null,
  gender: 1,
  age: null,
  result: "",
  progress: 0,
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
    calculateResult: (state) => {
      const { mass, height, gender, age } = state;
      const calculateBMI = () => {
        if (mass && height) {
          const bmi = mass / (height * height);
          return bmi.toFixed(2);
        }
        return "";
      };

      if (mass && height && age) {
        const result =
          1.39 * parseFloat(calculateBMI()) + 0.16 * age - 10.34 * gender - 9;
        const mappedResult =
          (Math.min(40, Math.max(0, result + 10)) / 40) * 100;
        state.result = result.toFixed(2);
        state.progress = mappedResult;
      } else {
        state.result = "";
        state.progress = 0;
      }
    },
  },
});

export const { setMass, setHeight, setGender, setAge, calculateResult } =
  bmiCalculatorSlice.actions;

export default bmiCalculatorSlice.reducer;
