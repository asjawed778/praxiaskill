import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { authBaseQuery } from './api';
export const usersApi = createApi({
  reducerPath: 'userApi',
  baseQuery: authBaseQuery,
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: ({ page = 1, limit = 10, query = '', active } = {}) => {
        let url = `/user/all?pageNo=${page}&limit=${limit}`;
        if (query.trim() !== '') {
          url += `&search=${encodeURIComponent(query.trim())}`;
        }
        if (typeof active === 'boolean') {
          url += `&active=${active}`;
        }
        return { url };
      },
    }),
    updateStatus: builder.mutation({
      query: ({userId}) =>({
        url: `user/status/${userId}`,
        method: "PATCH"
      })
    }),
    assignCourse: builder.mutation({
      query: ({courseId, userId}) =>({
        url: `user/assign-course`,
        body: {
          courseId,
          userId
        },
        method: "POST"
      }),
    }),
    addNewUser: builder.mutation({
      query: (data) => ({
        url: `user/add`,
        body: data,
        method: "POST"
      })
    }),
    updateUserDetails: builder.mutation({
      query: ({userId, updatedData}) => ({
        url: `user/${userId}`,
        body: updatedData,
        method: "PUT"
      })
    })
  }),
});


export const { 
  useGetAllUsersQuery, 
  useUpdateStatusMutation,
  useAssignCourseMutation,
  useAddNewUserMutation,
  useUpdateUserDetailsMutation,
} = usersApi;