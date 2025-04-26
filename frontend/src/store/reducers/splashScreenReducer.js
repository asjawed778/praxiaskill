// reducers/splashScreenReducer.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hasShown: false,
};

export const splashScreenSlice = createSlice({
  name: "splashScreen",
  initialState,
  reducers: {
    setSplashShown: (state) => {
      state.hasShown = true;
    },
  },
});

export const { setSplashShown } = splashScreenSlice.actions;
export default splashScreenSlice.reducer;
