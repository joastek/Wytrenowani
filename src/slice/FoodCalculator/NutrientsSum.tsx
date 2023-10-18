import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: number;
  FoodName: string;
  protein: string; // Typy zależą od rzeczywistego typu danych w produkcie
  carbo: string;
  fat: string;
  gainedCalories: string;
  // inne właściwości produktu
}

interface NutrientsState {
  totalProtein: number;
  totalCarbo: number;
  totalFat: number;
  totalCalories: number;
  products: Product[];
}

const initialState: NutrientsState = {
  totalProtein: 0,
  totalCarbo: 0,
  totalFat: 0,
  totalCalories: 0,
  products: [],
};

const nutrientsSlice = createSlice({
  name: "nutrients",
  initialState,
  reducers: {
    addNutriens: (state, action: PayloadAction<Product>) => {
      const { protein, carbo, fat, gainedCalories } = action.payload;
      state.totalProtein += Math.floor(parseFloat(protein || "0"));
      state.totalCarbo += parseFloat(carbo || "0");
      state.totalFat += parseFloat(fat || "0");
      state.totalCalories += parseFloat(gainedCalories || "0");
      state.products.push(action.payload);
      state.totalProtein = parseFloat(state.totalProtein.toFixed(1));
      state.totalCarbo = parseFloat(state.totalCarbo.toFixed(1));
      state.totalFat = parseFloat(state.totalFat.toFixed(1));
      state.totalCalories = parseFloat(state.totalCalories.toFixed(1));
    },
    deleteNutriens: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      const productIndex = state.products.findIndex(
        (product) => product.id === id
      );
      if (productIndex !== -1) {
        const deletedProduct = state.products[productIndex];
        state.totalProtein -= parseFloat(deletedProduct.protein || "0");
        state.totalCarbo -= parseFloat(deletedProduct.carbo || "0");
        state.totalFat -= parseFloat(deletedProduct.fat || "0");
        state.totalCalories -= parseFloat(deletedProduct.gainedCalories || "0");
        state.products.splice(productIndex, 1);
        state.totalProtein = parseFloat(state.totalProtein.toFixed(1));
        state.totalCarbo = parseFloat(state.totalCarbo.toFixed(1));
        state.totalFat = parseFloat(state.totalFat.toFixed(1));
        state.totalCalories = parseFloat(state.totalCalories.toFixed(1));
      }
    },
  },
});

export const { addNutriens, deleteNutriens } = nutrientsSlice.actions;
export default nutrientsSlice.reducer;
