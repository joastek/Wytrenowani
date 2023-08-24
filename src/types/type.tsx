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
  trainingSet: {
    value: any;
  };
}
export interface breakfastState {
  breakfastSet: {
    value: any;
  };
}
export interface lunchState {
  lunchSet: {
    value: any;
  };
}
export interface dinnerState {
  dinnerSet: {
    value: any;
  };
}
export interface TrainingData {
  id: number;
  username: string;
}

export interface TrainingSet {
  id: number;
  seriesName: string;
  series: number;
  reps: number;
}
export interface breakfastSet {
  FoodSets: any;
  FoodSet: any;
  id: number;
  FoodName: string;
  series: number;
  reps: number;
}
export interface lunchSet {
  FoodSets: any;
  FoodSet: any;
  id: number;
  FoodName: string;
  series: number;
  reps: number;
}
export interface dinnerSet {
  FoodSets: any;
  FoodSet: any;
  id: number;
  FoodName: string;
  series: number;
  reps: number;
}
