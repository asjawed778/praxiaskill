import { createApi } from "@reduxjs/toolkit/query/react";
import { authBaseQuery } from "./api";

export const apiCourse = createApi({
  reducerPath: "apiCourse",
  baseQuery: authBaseQuery,
  endpoints: (builder) => ({
    // Courses APIs
    uploadThumbnail: builder.mutation({
      query: ({formData, accessToken}) => {
        return {
          url: "course/thumbnail",
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${accessToken}`, // Send token in Authorization header
          },
          credentials: "include",
        };
      },
    }),
    uploadBrouchure: builder.mutation({
      query: ({formData, accessToken}) => {
        return {
          url: "course/brouchure",
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${accessToken}`, // Send token in Authorization header
          },
          credentials: "include",
        };
      },
    }),
    uploadCourse: builder.mutation({
      query: (data) => {
        return {
          url: "course",
          method: "POST",
          body: data,
          credentials: "include",
        };
      },
    }),
    uploadAdditionalDetails: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `course/additional-details/${id}`,
          method: "PUT",
          body: data,
          credentials: "include",
        };
      },
    }),
    uploadCourseStructure: builder.mutation({
      query: ({ data, id }) => { // here id is courseId
        return {
          url: `course/structure/${id}`,
          method: "PUT",
          body: data,
          credentials: "include",
        };
      },
    }),
    publishCourse: builder.mutation({
      query: ({ id: courseId }) => {
        return {
          url: `course/publish/${courseId}`,
          method: "POST",
          credentials: "include",
        };
      },
    }),
    getDropdownOptions: builder.query({
      query: (endpoint) => ({
        url: endpoint,
        method: "GET",
        credentials: "include",
      }),
    }),
    getAllCategory: builder.query({
      query: () => ({
        url: "course/category",
        method: "GET",
      }),
    }),
    addCategory: builder.mutation({
      query: (data) => ({
        url: "course/category",
        method: "POST",
        body: data,
        credentials: "include"
      }),
    }),
    setEnquiryStatus: builder.mutation({ //update
      query: ({data, enquiryId}) => ({
        url: `course/enquiry-status/${enquiryId}`,
        method: "PATCH",
        body: data,
        credentials: "include"
      }),
    }),
    addCourse: builder.mutation({ //update
      query: (data) => ({
        url: "course/add-course",
        method: "POST",
        body: data,
      }),
    }),
    sendEnquiry: builder.mutation({
      query: (data) => ({
        url: "course/enquiry",
        method: "POST",
        body: data,
      }),
    }),
    getAllEnquiry: builder.query({
      query: (page) => ({
        url: `course/enquiry?pageNo=${page}`,
        method: "GET",
      }),
    }),
    getAllPublishedCourse: builder.query({
      query: (pageNo) => ({
        url: `course/published?pageNo=${pageNo}`,
        method: "GET",
      }),
    }),
    getCategoryCourse: builder.query({ //name update
      query: (categoryId) => ({
        url: `course/published/${categoryId}`,
        method: "GET",
      }),
    }),
    getFullCourseDetails: builder.query({
      query: (courseId) => ({
        url: `course/${courseId}`, 
        method: "GET",
      }),
    }),
    getFullCourseContent: builder.query({
      query: (courseId) => ({
        url: `course/content/${courseId}`, 
        method: "GET",
      }),
    }),
  }),
});

export const {
  // Courses
  useUploadThumbnailMutation,
  useUploadBrouchureMutation,
  useUploadCourseMutation,
  useUploadAdditionalDetailsMutation,
  useUploadCourseStructureMutation,
  usePublishCourseMutation,
  useGetDropdownOptionsQuery,
  useGetAllCategoryQuery,
  useAddCategoryMutation,
  useSetEnquiryStatusMutation,
  useAddCourseMutation,
  useSendEnquiryMutation,
  useGetAllEnquiryQuery,
  useGetAllPublishedCourseQuery,
  useGetCategoryCourseQuery,
  useGetFullCourseDetailsQuery,
  useGetFullCourseContentQuery,
} = apiCourse;
