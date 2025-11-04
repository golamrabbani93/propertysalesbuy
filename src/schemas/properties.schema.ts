import {z} from 'zod';

export const PropertiesSchema = z.object({
	title: z.string('Title is required').min(2, 'Title is required'),
	status: z
		.object({
			label: z.string(),
			value: z.string(),
		})
		.optional(),
	// .refine((data) => data?.value, {
	// 	message: 'Please select a valid Status',
	// }),
	property_type: z
		.object({
			label: z.string(),
			value: z.string(),
		})
		.optional()
		.refine((data) => data?.value, {
			message: 'Please select a Property Type',
		}),
	price: z.string('Price is required').min(1, 'Price is required'),
	bedrooms: z
		.object({
			label: z.string(),
			value: z.string(),
		})
		.optional(),
	bathrooms: z
		.object({
			label: z.string(),
			value: z.string(),
		})
		.optional(),
	features: z
		.array(
			z.object({
				label: z.string(),
				value: z.string(),
			}),
		)
		.optional(),

	areas: z.string('Area is required').min(1, 'Area is required'),
	description: z.string('Description is required').min(10, 'Description is required'),
	address: z.string('Address is required').min(5, 'Address is required'),
	name: z.string('Name is required').min(2, 'Name is required'),
	email: z.string('Email is required').email('Email is required'),
	phone: z
		.string('Phone Number is required')
		.min(7, 'Phone Number is required')
		.max(15, 'Phone number too long'),
});

export const LandSchema = z.object({
	plot_number: z.string('Plot Number is required').min(1, 'Plot Number is required'),
	holding_number: z.string('Holding Number is required').min(1, 'Holding Number is required'),
	areas: z.string('Area is required').min(1, 'Area is required'),
	description: z.string('Description is required').min(10, 'Description is required'),
	address: z.string('Address is required').min(5, 'Address is required'),
	name: z.string('Name is required').min(2, 'Name is required'),
	email: z.string('Email is required').email('Email is required'),
	price: z.string('Price is required').min(1, 'Price is required'),
	title: z.string('Title is required').min(2, 'Title is required'),
	phone: z
		.string('Phone Number is required')
		.min(7, 'Phone Number is required')
		.max(15, 'Phone number too long'),
	property_type: z
		.object({
			label: z.string(),
			value: z.string(),
		})
		.optional(),
	soil_type: z
		.object({
			label: z.string(),
			value: z.string(),
		})
		.optional()
		.refine((data) => data?.value, {
			message: 'Please select a Soil Type',
		}),
	land_shape: z
		.object({
			label: z.string(),
			value: z.string(),
		})
		.optional()
		.refine((data) => data?.value, {
			message: 'Please select a Land Shape',
		}),
	features: z
		.array(
			z.object({
				label: z.string(),
				value: z.string(),
			}),
		)
		.optional(),
});

export type PropertiesSchemaType = z.infer<typeof PropertiesSchema>;
export type LandSchemaType = z.infer<typeof LandSchema>;
