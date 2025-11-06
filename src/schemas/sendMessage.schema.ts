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

export const contactSendMessageSchema = z.object({
	name: z.string('Name is required').min(3, 'Name is required').max(50, 'Name is required'),
	email: z.string('Email is required').email('Email is required'),
	phone: z
		.string('Phone number is required')
		.min(5, 'Phone number is required')
		.max(15, 'Phone number is required'),
	message: z
		.string('Description is required')
		.min(10, 'Description is required')
		.max(500, 'Description is required'),
	subject: z
		.string('Subject is required')
		.min(5, 'Subject is required')
		.max(100, 'Subject is required'),
});
