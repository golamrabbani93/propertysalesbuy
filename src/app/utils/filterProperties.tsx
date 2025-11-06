import {IProperty} from '@/types/property.types';

type Filter = {
	location: string;
	propertyType: string;
	bedrooms: string;
	priceRange: string;
	verified: boolean;
	superAgent: boolean;
	searchText?: string;
};

export function filterProperties(properties: IProperty[], filter: Filter) {
	console.log('🚀🚀 ~ filterProperties ~ filter:', filter);
	return properties.filter((property) => {
		// Search by name (case insensitive)
		if (
			filter.searchText &&
			!property.title.toLowerCase().includes(filter.searchText.toLowerCase())
		) {
			return false;
		}

		// Location filter (check if property.loction includes filter.location)
		if (
			filter.location &&
			!property.address.toLowerCase().includes(filter.location.toLowerCase())
		) {
			return false;
		}

		// Property type filter
		if (filter.propertyType && property.property_type !== filter.propertyType.toLowerCase()) {
			return false;
		}

		// Bedrooms filter (match beds string)
		if (filter.bedrooms && property.bedrooms !== filter.bedrooms) {
			return false;
		}

		// Price range filter
		if (filter.priceRange) {
			const priceNumber = Number(property.price.replace(/[^\d]/g, ''));
			console.log('Price:', priceNumber);

			const priceRanges: Record<string, [number, number]> = {
				'Less Than ৳1,200,000': [0, 1199999],
				'৳1,200,000 - ৳1,800,000': [1200000, 1800000],
				'৳1,800,001 - ৳3,000,000': [1800001, 3000000],
				'৳3,000,001 - ৳4,200,000': [3000001, 4200000],
				'৳4,200,001 - ৳5,400,000': [4200001, 5400000],
				'৳5,400,001 - ৳6,600,000': [5400001, 6600000],
				'৳6,600,001 - ৳7,800,000': [6600001, 7800000],
				'More Than ৳7,800,000': [7800001, Infinity],
			};

			const range = priceRanges[filter.priceRange];
			console.log('🚀🚀 ~ filterProperties ~ range:', range);
			if (!range) {
				console.warn('No matching range for:', filter.priceRange);
				return false;
			}

			const [min, max] = range;
			return priceNumber >= min && priceNumber <= max;
		}

		// // Verified filter (assuming 'Verified' means tag includes 'Verified')
		// if (filter.verified && !property.tag.includes('Verified')) {
		// 	return false;
		// }

		// // SuperAgent filter (check if tag includes 'SuperAgent')
		// if (filter.superAgent && !property.tag.includes('SuperAgent')) {
		// 	return false;
		// }

		return true;
	});
}
