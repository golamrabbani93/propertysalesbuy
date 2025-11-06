import {baseApi} from '@/redux/baseApi';

export const messageApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		// 🟢 Get all messages
		getAllMessages: builder.query({
			query: () => ({
				url: 'PSBMessage/',
				method: 'GET',
			}),
			providesTags: ['message'],
			transformResponse: (response) => response,
		}),

		// 🟢 Get message by ID
		getMessageById: builder.query({
			query: (id) => ({
				url: `PSBMessage/${id}/`,
				method: 'GET',
			}),
			providesTags: ['message'],
			transformResponse: (response) => response,
		}),

		// 🟢 Create a new message
		createMessage: builder.mutation({
			query: (data) => ({
				url: 'PSBMessage/new/',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['message'],
			transformResponse: (response) => response,
		}),

		// 🟢 Update an existing message
		updateMessage: builder.mutation({
			query: ({id, data}) => ({
				url: `PSBMessage/${id}/`,
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: ['message'],
			transformResponse: (response) => response,
		}),

		// 🟢 Delete a message
		deleteMessage: builder.mutation({
			query: (id) => ({
				url: `PSBMessage/${id}/`,
				method: 'DELETE',
			}),
			invalidatesTags: ['message'],
			transformResponse: (response) => response,
		}),
	}),
});

export const {
	useGetAllMessagesQuery,
	useGetMessageByIdQuery,
	useCreateMessageMutation,
	useUpdateMessageMutation,
	useDeleteMessageMutation,
} = messageApi;
