export interface BMIState {
  mass: number | null;
  height: number | null;
  gender: number;
  age: number | null;
  result: number;
  progress: number;
}
export interface RootState {
  bmiCalculator: BMIState;
}
