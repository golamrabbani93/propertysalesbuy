import {baseApi} from '@/redux/baseApi';

export const totalViewsApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		// 🟢 Get all total views
		getAllTotalViews: builder.query({
			query: () => ({
				url: 'PSBTotalViews/',
				method: 'GET',
			}),
			providesTags: ['totalViews'],
			transformResponse: (response) => response,
		}),

		// 🟢 Get total view by ID
		getTotalViewById: builder.query({
			query: (id) => ({
				url: `PSBTotalViews/${id}/`,
				method: 'GET',
			}),
			providesTags: ['totalViews'],
			transformResponse: (response) => response,
		}),

		// 🟢 Create a new total view
		createTotalView: builder.mutation({
			query: (data) => ({
				url: 'PSBTotalViews/new/',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['totalViews'],
			transformResponse: (response) => response,
		}),

		// 🟢 Update a total view
		updateTotalView: builder.mutation({
			query: ({id, data}) => ({
				url: `PSBTotalViews/${id}/`,
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: ['totalViews'],
			transformResponse: (response) => response,
		}),

		// 🟢 Delete a total view
		deleteTotalView: builder.mutation({
			query: (id) => ({
				url: `PSBTotalViews/${id}/`,
				method: 'DELETE',
			}),
			invalidatesTags: ['totalViews'],
			transformResponse: (response) => response,
		}),
	}),
});

export const {
	useGetAllTotalViewsQuery,
	useGetTotalViewByIdQuery,
	useCreateTotalViewMutation,
	useUpdateTotalViewMutation,
	useDeleteTotalViewMutation,
} = totalViewsApi;
