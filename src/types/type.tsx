export interface BMIState {
  mass: number | null;
  height: number | null;
  gender: number;
  age: number | null;
  result: number;
  progress: number;
}
export interface RootState {
  trainingList: any;
  bmiCalculator: BMIState;
}

export interface trainingState {
  trainingList: {
    value: any;
  };
}
export interface TrainingData {
  id: number;
  username: string;

}