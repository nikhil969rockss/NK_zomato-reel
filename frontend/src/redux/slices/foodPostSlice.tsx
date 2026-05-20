import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface FoodPost {
  _id: string;
  video: string;
  name: string;
  description: string;
  foodPartnerId: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface FoodPostState {
  foodPosts: FoodPost[];
  foodPost: FoodPost | null;
}

const initialState: FoodPostState = {
  foodPosts: [],
  foodPost: null,
};

export const foodPostSlice = createSlice({
  name: "foodPost",
  initialState,
  reducers: {
    setFoodPosts: (state, action: PayloadAction<FoodPost[]>) => {
      state.foodPosts = [...action.payload];
    },
    setFoodPost: (state, action: PayloadAction<FoodPost | null>) => {
      state.foodPost = action.payload;
    },
  },
});

export const { setFoodPost, setFoodPosts } = foodPostSlice.actions;
export default foodPostSlice.reducer;
