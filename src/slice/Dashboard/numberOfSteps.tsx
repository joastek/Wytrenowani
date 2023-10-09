import { createSlice } from "@reduxjs/toolkit";

const numberOfStepsSlice = createSlice({
  name: "numberOfSteps",
  initialState: {
    numberOfSteps: 0,
  },
  reducers: {
    updateNumberOfSteps: (state, action) => {
      state.numberOfSteps = action.payload;
    },
  },
});

export const { updateNumberOfSteps } = numberOfStepsSlice.actions;

export default numberOfStepsSlice.reducer;
