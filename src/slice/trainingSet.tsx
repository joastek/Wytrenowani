import { createSlice } from "@reduxjs/toolkit";
import { TrainingSet } from "@/types/type";

export const TrainingSetSlice = createSlice({
  name: "trainingSet",
  initialState: { value: [] as TrainingSet[] },
  reducers: {
    addSet: (state, action) => {
      state.value.push(action.payload);
    },
    deleteSet: (state, action) => {
      state.value = state.value.filter((user) => user.id !== action.payload.id);
    },
    updateSet: (state, action) => {
      state.value.map((user) => {
        if (user.id === action.payload.id) {
          user.seriesName = action.payload.seriesName;
          user.series = action.payload.series;
          user.reps = action.payload.reps;
        }
      });
    },
  },
});
export const { addSet, deleteSet, updateSet } = TrainingSetSlice.actions;
export default TrainingSetSlice.reducer;
