// waterFillSlice.js

import { createSlice } from "@reduxjs/toolkit";

const waterFillSlice = createSlice({
  name: "waterFill",
  initialState: {
    fillLevels: Math.ceil((-50 + 50) / 10),
    animationLevel: -50,
    targetFillLevel: 9,
  },
  reducers: {
    updateFillLevels: (state, action) => {
      state.fillLevels = action.payload;
    },
    updateAnimationLevels: (state, action) => {
      state.animationLevel = action.payload;
    },
    updateTargetFillLevel: (state, action) => {
      state.targetFillLevel = action.payload;
    },
  },
});

export const {
  updateFillLevels,
  updateAnimationLevels,
  updateTargetFillLevel,
} = waterFillSlice.actions;

export default waterFillSlice.reducer;
