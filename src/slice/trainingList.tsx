import { createSlice } from "@reduxjs/toolkit";
import { UsersData } from "./FakeData";
export const TrainingListSlice = createSlice({
  name: "trainingList",
  initialState: { value: UsersData },
  reducers: {
    addTraining: (state, action) => {
      state.value.push(action.payload);
    },
  },
});

export const { addTraining } = TrainingListSlice.actions;
export default TrainingListSlice.reducer;
