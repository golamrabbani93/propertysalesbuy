export interface IProperty {
	id: number;
	title: string;
	status: string;
	property_type: string;
	price: string;
	bedrooms: string;
	bathrooms: string;
	address: string;
	areas: string;
	description: string;
	other_features: any;
	amenities: IAmenity[];
	contact_information: any;
	image1: string;
	image2: string;
	image3: string;
	image4: string;
	image5: any;
	image6: any;
	published: boolean;
	created_at: string;
	updated_at: string;
	user: number;
}

export interface IAmenity {
	label: string;
	value: string;
}
