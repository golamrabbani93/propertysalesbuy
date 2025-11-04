import {baseApi} from '@/redux/baseApi';

const propertyManagementApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		// 🟢 Get all properties
		getAllProperties: builder.query({
			query: () => ({
				url: 'PSBProperties/',
				method: 'GET',
			}),
			providesTags: ['property'],
			transformResponse: (response) => response,
		}),

		// 🟢 Get property by ID
		getPropertyById: builder.query({
			query: (id) => ({
				url: `PSBProperties/${id}/`,
				method: 'GET',
			}),
			providesTags: ['property'],
			transformResponse: (response) => response,
		}),

		// 🟢 Create a new property
		createProperty: builder.mutation({
			query: (data) => ({
				url: 'PSBProperties/new/',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['property'],
			transformResponse: (response) => response,
		}),

		// 🟢 Update an existing property
		updateProperty: builder.mutation({
			query: ({id, data}) => ({
				url: `PSBProperties/${id}/`,
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: ['property'],
			transformResponse: (response) => response,
		}),

		// 🟢 Delete a property
		deleteProperty: builder.mutation({
			query: (id) => ({
				url: `PSBProperties/${id}/`,
				method: 'DELETE',
			}),
			invalidatesTags: ['property'],
			transformResponse: (response) => response,
		}),
	}),
});

export const {
	useGetAllPropertiesQuery,
	useGetPropertyByIdQuery,
	useCreatePropertyMutation,
	useUpdatePropertyMutation,
	useDeletePropertyMutation,
} = propertyManagementApi;
