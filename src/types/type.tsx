export interface BMIState {
  mass: number;
  height: number;
  gender: number;
  age: number;
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
  breakfastSet: any;
  id: number;
  FoodName: string;
  protein: number;
  carbo: number;
  fat: number;
  calories: number;
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

export interface NutrientsState {
  protein: number;
  carbo: number;
  fat: number;
  gainedCalories: number;
  id: string;
}

//// WeatherAPI
export interface WeatherData {
  city: string;
  main: {
    temp: number;
    humidity: string;
  };
  temp: number;
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: string;
  };
  name: string;
}

export const initialWeatherData: WeatherData = {
  city: "",
  main: { temp: 0, humidity: "" },
  temp: 0,
  weather: [{ description: "", icon: "" }],
  wind: { speed: "" },
  name: "",
};

/// GeolocalizationAPI
export interface GeolocalizationData {
  longitude: number;
  latitude: number;
  city: string;
}
export const initialGeolocalizationData: GeolocalizationData = {
  longitude: 0,
  latitude: 0,
  city: "",
};
export interface WeatherState {
  weather: {
    currLocation: GeolocalizationData;
    currentWeather: WeatherData;
  };
}
export interface UserDetails {
  id: string;
  first_name: string;
  last_name: string;
  full_name?: string;
  avatar_url?: string;
}
export interface Weight {


  date: string;
  id: string;
  user_id: string;
  weight: string;
}
