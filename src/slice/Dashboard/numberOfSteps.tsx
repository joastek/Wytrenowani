import { createSlice } from "@reduxjs/toolkit";

const numberOfStepsSlice = createSlice({
  name: "numberOfSteps",
  initialState: {
    numberOfSteps: 0,
    targetQuantitySteps: 10000,
  },
  reducers: {
    updateNumberOfSteps: (state, action) => {
      state.numberOfSteps = action.payload;
    },
    updateTargetQuantitySteps: (state, action) => {
      state.targetQuantitySteps = action.payload;
    },
  },
});

export const { updateNumberOfSteps, updateTargetQuantitySteps } =
  numberOfStepsSlice.actions;

export default numberOfStepsSlice.reducer;
