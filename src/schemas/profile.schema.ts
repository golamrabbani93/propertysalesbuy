import {z} from 'zod';

export const profileSchema = z.object({
	name: z
		.string('Name is required')
		.min(2, 'Name is required')
		.max(100, 'Name must be under 100 characters'),
	email: z.string('Email is required').email('Invalid email address'),
	phone: z

		.string('Phone Number is required')
		.min(7, 'Phone Number is too short')
		.max(15, 'Phone number too long'),
	address: z

		.string('Address is required')
		.min(5, 'Address is required')
		.max(200, 'Address must be under 200 characters'),
});
