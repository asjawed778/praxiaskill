import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [],
  specificCourse:{}
};

export const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    setSpecificCourse: (state, action) => {
      state.specificCourse = action.payload
    }
  },
});

export const { setCourses, setSpecificCourse } = courseSlice.actions;
export default courseSlice.reducer;
