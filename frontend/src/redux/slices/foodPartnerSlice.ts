import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface FoodPartner {
  _id: string;
  name: string;
  contactName: string;
  phone: string;
  address: string;
  email: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface FoodPartnerState {
  foodPartner: FoodPartner | null;
}

const initialState: FoodPartnerState = {
  foodPartner: null,
};

export const foodPartnerSlice = createSlice({
  name: "foodPartner",
  initialState,
  reducers: {
    setFoodPartner: (state, action: PayloadAction<FoodPartner | null>) => {
      state.foodPartner = action.payload;
    },
  },
});
export const { setFoodPartner } = foodPartnerSlice.actions;
export default foodPartnerSlice.reducer;
