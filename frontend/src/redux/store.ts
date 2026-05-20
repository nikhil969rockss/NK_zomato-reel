import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/userSlice";
import { foodPartnerSlice } from "./slices/foodPartnerSlice";
import { foodPostSlice } from "./slices/foodPostSlice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    foodPartner: foodPartnerSlice.reducer,
    foodPost: foodPostSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
