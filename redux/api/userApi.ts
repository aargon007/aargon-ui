import { baseApi } from './baseApi';

const userApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: builder => ({
        // login
        login: builder.mutation({
            query: data => {
                // console.log(data);
                return {
                    url: '/auth/login',
                    method: 'POST',
                    body: data,
                };
            },
            invalidatesTags: ['user'],
        }),

        // register
        register: builder.mutation({
            query: data => {
                // console.log(data);
                return {
                    url: '/auth/register',
                    method: 'POST',
                    body: data,
                };
            },
            invalidatesTags: ['user'],
        }),

        // get user data
        getUser: builder.query({
            query: () => {
                return {
                    url: '/auth',
                    method: 'GET',
                };
            },
            providesTags: ['user'],
        }),

        // Update User
        updateUser: builder.mutation({
            query: data => {
                return {
                    url: '/auth',
                    method: 'PUT',
                    body: data,
                };
            },
            invalidatesTags: ['user'],
        }),

        // Delete User
        deleteUser: builder.mutation({
            query: id => {
                return {
                    url: `/auth/delete/${id}`,
                    method: 'DELETE',
                };
            },
            invalidatesTags: ['user'],
        }),

        // single item caching
        getSingleItem: builder.query({
            query: ({ id }) => ({
                url: `/api/items/${id}`,
                method: 'GET',
            }),
            providesTags: (result, error, { id }) => [{ type: 'user', id }],
        }),

        // change user password
        changePassword: builder.mutation({
            query: ({ data }) => {
                return {
                    url: '/user/change-password',
                    method: 'PUT',
                    body: data,
                };
            },
            invalidatesTags: ['user'],
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useGetUserQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useGetSingleItemQuery,
    useChangePasswordMutation,
} = userApi;

export default userApi;
