export interface IProperty {
	id: number;
	title: string;
	status: string;
	property_type: string;
	price: string;
	bedrooms?: string;
	bathrooms?: string;
	address: string;
	areas: string;
	description: string;
	other_features?: any;
	amenities?: Amenity[];
	contact_information: ContactInformation;
	image1?: string;
	image2?: string;
	image3?: string;
	image4?: string;
	image5?: string;
	image6?: string;
	published?: boolean;
	created_at?: string;
	updated_at?: string;
	plot_number?: any;
	holding_number?: any;
	land_zone?: any;
	utility_access?: any;
	land_shape?: any;
	soil_type?: any;
	videos?: string;
	views?: number;
	user: number;
}

export interface Amenity {
	label: string;
	value: string;
}

export interface ContactInformation {
	name: string;
	email: string;
	phone: string;
}
