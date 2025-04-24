import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ page = 1, limit = 10, query = '' }) => ({
        url: `/users`,
        params: {
            _limit: limit,
          _page: page,
          q: query
        }
      }),
      transformResponse: (response, meta) => {
        // Get total count from headers
        const totalCount = Number(meta?.response?.headers?.get('X-Total-Count')) || response.length || 0;
        return {
          users: response,
          total: totalCount
        };
      },
      // Provides tags for caching
      providesTags: (result) =>
        result
          ? [
              ...result.users.map(({ id }) => ({ type: 'Users', id })),
              { type: 'Users', id: 'LIST' },
            ]
          : [{ type: 'Users', id: 'LIST' }],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      // Invalidates cache after deletion
      invalidatesTags: (result, error, arg) => [{ type: 'Users', id: arg }],
    }),
  }),
});

export const { 
  useGetUsersQuery,
  useDeleteUserMutation 
} = usersApi;