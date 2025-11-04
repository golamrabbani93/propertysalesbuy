import {baseApi} from '@/redux/baseApi';

const userManagementApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getMyProfile: builder.query({
			query: (id) => {
				return {
					url: `PSBUser/${id}/`,
					method: 'GET',
				};
			},
			providesTags: ['user'],
			transformResponse: (response) => response,
		}),
		updateMyProfile: builder.mutation({
			query: ({id, data}) => {
				console.log(data);
				return {
					url: `PSBUser/${id}/`,
					method: 'PUT',
					body: data,
				};
			},
			invalidatesTags: ['user'],
			transformResponse: (response) => {
				if (response) {
					return response;
				}
			},
		}),
		getAllUsers: builder.query({
			query: () => ({
				url: 'PSBUser/',
				method: 'GET',
			}),
			providesTags: ['user'],
			transformResponse: (response) => response,
		}),
		deleteUser: builder.mutation({
			query: (id) => ({
				url: `PSBUser/${id}/`,
				method: 'DELETE',
			}),
			invalidatesTags: ['user'],
			transformResponse: (response) => {
				return response;
			},
		}),
	}),
});

export const {
	useGetMyProfileQuery,
	useUpdateMyProfileMutation,
	useGetAllUsersQuery,
	useDeleteUserMutation,
} = userManagementApi;
