export interface BMIState {
  mass: number;
  height: number;
  gender: number;
  age: number ;
  result: number;
  progress: number;
  activity: number;
  calories: number;
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

export interface nutriensSum {
  breakfast: any;
  lunch: any;
  dinner: any;
  totalProtein: any;
  totalCarbo: any;
  totalFat: any;
  totalCalories: any;
}
