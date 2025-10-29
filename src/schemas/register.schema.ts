import {z} from 'zod';

export const registerSchema = z.object({
	name: z
		.string('Name is required')
		.min(2, 'Name is required')
		.max(100, 'Name must be under 100 characters'),
	email: z.string('Email is required').email('Invalid email address'),
	phone: z
		.string('Phone Number is required')
		.min(7, 'Phone Number is too short')
		.max(15, 'Phone number too long'),
	password: z
		.string('Password is required')
		.min(6, 'Password must be at least 6 characters')
		.max(100, 'Password too long'),
});

export const loginSchema = z.object({
	email: z.string('Email is required').email('Invalid email address'),
	password: z

		.string('Password is required')
		.min(6, 'Password must be at least 6 characters')
		.max(100, 'Password too long'),
});
