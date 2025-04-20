import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
  isMobileOpen: false,
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.open = !state.open;
    },
    setMobileOpen: (state, action) => {
      state.isMobileOpen = action.payload;
    },
  },
});

export const { toggleSidebar, setMobileOpen } = sidebarSlice.actions;
export default sidebarSlice.reducer;
