import {createSlice} from '@reduxjs/toolkit';

const initialState = {
	id: undefined,
	name: '',
	email: '',
	phone: '',
	image: '',
	role: undefined,
	token: '',
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.id = action.payload.id;
			state.name = action.payload.name;
			state.email = action.payload.email;
			state.phone = action.payload.phone;
			state.image =
				action.payload.image ||
				'https://res.cloudinary.com/dolttvkme/image/upload/v1739084572/custom-avatar_llfgxl.png';
			state.role = action.payload.role;
			state.token = action.payload.token;
		},
		clearUser: (state) => {
			state.id = undefined;
			state.name = '';
			state.email = '';
			state.phone = '';
			state.image =
				'https://res.cloudinary.com/dolttvkme/image/upload/v1739084572/custom-avatar_llfgxl.png';
			state.role = undefined;
			state.token = '';
		},
	},
});

export const {setUser, clearUser} = authSlice.actions;
export const selectUser = (state: {auth: typeof initialState}) => state.auth;
export default authSlice.reducer;
