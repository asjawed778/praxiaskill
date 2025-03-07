import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [], // List of all categories
};

export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const { setLoading, setCategories, setError } = categorySlice.actions;

export default categorySlice.reducer;
