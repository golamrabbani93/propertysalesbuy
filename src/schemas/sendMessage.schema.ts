import {z} from 'zod';

export const sendMessageSchema = z.object({
	email: z.string('Email is required').email('Email is required'),
	phone: z
		.string('Phone number is required')
		.min(5, 'Phone number is required')
		.max(15, 'Phone number is required'),
	message: z
		.string('Description is required')
		.min(10, 'Description is required')
		.max(500, 'Description is required'),
});
