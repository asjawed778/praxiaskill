import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const videoApi = createApi({
  reducerPath: "videoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  tagTypes: ["SubSections"],
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => "/videos",
    }),

    getSubSections: builder.query({
      query: (videoId) => `/subSections?videoId=${videoId}`,
      providesTags: (result, error, videoId) => [{ type: "SubSections", id: videoId }],
    }),
    updateCompletion: builder.mutation({
        query: ({ subsectionId, completed }) => ({
          url: `/subSections/${subsectionId}`,
          method: "PATCH",
          body: { completed }, // Only send completion status
        }),
        invalidatesTags: (result, error, {subsectionId}) => [{type: "subSections", id: subsectionId}],
      }),
      getCourseOverview: builder.query({
        query: () => "courseOverview"
      }),
      getCourseReview: builder.query({
        query: () => "courseReview"
      }),
      getCourseQnA: builder.query({
        query: () =>"courseQnA"
      }),
      getReviews: builder.query({
        query: () => '/reviews',
      }),
      getCourseInfo: builder.query({
        query: () => "/course_info",
      }),
      addReview: builder.mutation({
        query: (reviewData) => {
          console.log("Review data: ", reviewData);
          
          return{
            url: '/reviews',
          method: 'POST',
          body: reviewData,
          }
        },
      }),
      getAnnouncements: builder.query({
        query: () => "/announcements",
      }),

      getNotesByVideo: builder.query({
        query: (videoId=1) => `notes?videoId=${videoId}`,
      }),
      addNote: builder.mutation({
        query: (newNote) => ({
          url: "notes",
          method: "POST",
          body: newNote,
        }),
      }),
      deleteNote: builder.mutation({
        query: (noteId) => ({
          url: `notes/${noteId}`,
          method: "DELETE",
        }),
      }),
  }),
});

export const { useGetVideosQuery, useGetSubSectionsQuery, useUpdateCompletionMutation, useGetCourseOverviewQuery, useGetCourseReviewQuery, useGetCourseQnAQuery, useGetReviewsQuery, useAddReviewMutation, useGetCourseInfoQuery, useGetAnnouncementsQuery, useGetNotesByVideoQuery, useAddNoteMutation, useDeleteNoteMutation} = videoApi;
