import { createSlice } from "@reduxjs/toolkit";
import { TrainingData } from "@/types/type";

export const TrainingListSlice = createSlice({
  name: "trainingList",
  initialState: { value: [] as TrainingData[] },
  reducers: {
    addTraining: (state, action) => {
      state.value.push(action.payload);
    },
    deleteTraining: (state, action) => {
      state.value = state.value.filter((user) => user.id !== action.payload.id);
    },
    updateTraining: (state, action) => {
      state.value.map((user) => {
        if (user.id === action.payload.id) {
          user.username = action.payload.username;
        }
      });
    },
  },
});

export const { addTraining, deleteTraining, updateTraining } =
  TrainingListSlice.actions;
export default TrainingListSlice.reducer;
