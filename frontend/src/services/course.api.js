import { createApi } from "@reduxjs/toolkit/query/react";
import { authBaseQuery } from "./api";

export const apiCourse = createApi({
  reducerPath: "apiCourse",
  baseQuery: authBaseQuery,
  endpoints: (builder) => ({
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
        credentials: "include",
      }),
    }),
    setEnquiryStatus: builder.mutation({
      //update
      query: ({ data, enquiryId }) => ({
        url: `course/enquiry-status/${enquiryId}`,
        method: "PATCH",
        body: data,
        credentials: "include",
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
      query: ({ page = 1, limit = 10, search = "",status="", sortBy="" }) => {
        const params = {
          ...(status && { status }),
          ...(search && { search }),
          ...(sortBy && {sortBy}),
          page,
          limit,
        };
        return {
          url: "course/enquiry",
          params,
          method: "GET",
          credentials: "include",
        };
      },
    }),
    getFullCourseDetails: builder.query({
      query: (identifier) => ({
        url: `course/${identifier}`,
        method: "GET",
      }),
    }),
    getFullCourseContent: builder.query({
      query: (courseId) => ({
        url: `course/content/${courseId}`,
        method: "GET",
      }),
    }),
    startUpload: builder.mutation({
      query: ({
        courseId,
        sectionId,
        subSectionId,
        fileName,
        fileType,
        courseTitle,
      }) => ({
        url: `course/start-upload/${courseId}/${sectionId}/${subSectionId}`,
        method: "POST",
        body: { fileName, fileType, courseTitle },
        credentials: "include",
      }),
    }),
    chunkUpload: builder.mutation({
      query: ({ courseId, sectionId, subSectionId, formData }) => ({
        url: `course/chunk-upload/${courseId}/${sectionId}/${subSectionId}`,
        method: "POST",
        body: formData,
        credentials: "include",
      }),
    }),
    completeUpload: builder.mutation({
      query: ({
        courseId,
        sectionId,
        subSectionId,
        uploadId,
        fileKey,
        parts,
      }) => ({
        url: `course/complete-upload/${courseId}/${sectionId}/${subSectionId}`,
        method: "POST",
        body: { uploadId, fileKey, parts },
        credentials: "include",
      }),
    }),
    getLectureVideo: builder.query({
      query: ({ courseId, sectionId, subSectionId }) => ({
        url: `course/presigned/${courseId}/${sectionId}/${subSectionId}`,
        method: "GET",
      }),
    }),
    getMyCourses: builder.query({
      query: (pageNo) => ({
        url: `course/my-courses?pageNo${pageNo}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    updateCourseDetails: builder.mutation({
      query: ({ courseId, data }) => ({
        url: `course/details/${courseId}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),

    rateCourse: builder.mutation({
      query: ({ courseId, data }) => ({
        url: `course/rate/${courseId}`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    getCourseRatings: builder.query({
      query: ({ courseId, pageNo = 1, limit = 10, sort = "latest" }) => ({
        url: `course/ratings/${courseId}?pageNo=${pageNo}&limit=${limit}&sort=${sort}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    uploadFile: builder.mutation({
      query: (file) => ({
        url: "/course/file",
        method: "POST",
        body: file,
      }),
    }),
    createCourseNotes: builder.mutation({
      query: ({ courseId, sectionId, subSectionId, body }) => ({
        url: "/course/notes",
        method: "POST",
        params: {
          courseId,
          sectionId,
          subSectionId
        },
        body,
        credentials: "include",
      })
    }),
    getNotes: builder.query({
      query: ({ courseId = "", sectionId = "", subSectionId = "", page = 1, limit = 10, search = "", sort = "latest" }) => {
        const params = {
          ...(courseId && { courseId }),
          ...(sectionId && { sectionId }),
          ...(subSectionId && { subSectionId }),
          ...(search && { search }),
          page,
          limit,
          sort,
        };
        return {
          url: "/course/notes/my",
          params,
          method: "GET",
          credentials: "include",
        };
      },
    }),
    deleteNotes: builder.mutation({
      query: (notesId) => ({
        url: `/course/notes/${notesId}`,
        method: "DELETE",
        credentials: "include",
      })
    }),
    updateNotes: builder.mutation({
      query: ({ noteId, notes }) => ({
        url: `/course/notes/${noteId}`,
        method: "PUT",
        body: notes,
        credentials: "include",
      })
    }),
    getCourses: builder.query({
      query: ({ page = 1, limit = 10, category, status, search }) => ({
        url: `/course/all?${new URLSearchParams({
          page,
          limit,
          ...(category && { category }),
          ...(status && { status }),
          ...(search && { search }),
        })}`,
        method: "GET",
      })
    }),
    updateCourseStatus: builder.mutation({
      query: ({ courseId, status}) => ({
        url: `/course/status/${courseId}?status=${status}`,
        method: "PATCH"
      })
    })
  }),
});

export const {
  useUploadCourseMutation,
  useGetDropdownOptionsQuery,
  useGetAllCategoryQuery,
  useAddCategoryMutation,
  useSetEnquiryStatusMutation,
  useSendEnquiryMutation,
  useGetAllEnquiryQuery,
  useGetFullCourseDetailsQuery,
  useGetFullCourseContentQuery,
  useStartUploadMutation,
  useChunkUploadMutation,
  useCompleteUploadMutation,
  useGetLectureVideoQuery,
  useGetMyCoursesQuery,
  useTerminateCourseMutation,
  useUpdateCourseDetailsMutation,
  useRateCourseMutation,
  useGetCourseRatingsQuery,
  useUploadFileMutation,
  useCreateCourseNotesMutation,
  useGetNotesQuery,
  useDeleteNotesMutation,
  useUpdateNotesMutation,
  useGetCoursesQuery,
  useUpdateCourseStatusMutation,
} = apiCourse;
