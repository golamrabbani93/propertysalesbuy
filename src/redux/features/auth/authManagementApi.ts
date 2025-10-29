import {baseApi} from '@/redux/baseApi';
import {TUser} from '@/types/user.types';
import comparePassword from '@/utils/comparePassword';

const authManagementApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		userRegister: builder.mutation({
			query: (data) => {
				return {
					url: `PSBUser/new/`,
					method: 'POST',
					body: data,
				};
			},
			invalidatesTags: ['auth', 'user'],
			transformResponse: (response) => {
				if (response) {
					return response;
				}
			},
		}),
		userLogin: builder.mutation({
			queryFn: async (data, _queryApi, _extraOptions, baseQuery) => {
				try {
					const response = await baseQuery({
						url: `PSBUser/`,
						method: 'GET',
					});

					if (response.error) {
						return {error: response.error};
					}

					const users: TUser[] = response.data as TUser[];

					const user = users.find((u) => u.email === data.email);
					if (!user) {
						return {error: {status: 404, data: 'User not found'}};
					}

					const isPasswordValid = await comparePassword(data.password, user.password);
					if (!isPasswordValid) {
						return {error: {status: 401, data: 'Invalid password'}};
					}

					return {data: user}; // ✅ Return inside { data }
				} catch (err: any) {
					console.error(err);
					return {error: {status: 500, data: 'Internal server error'}};
				}
			},
		}),
	}),
});

export const {useUserRegisterMutation, useUserLoginMutation} = authManagementApi;
