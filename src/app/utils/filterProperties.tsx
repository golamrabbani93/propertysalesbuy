type Filter = {
	location: string;
	propertyType: string;
	bedrooms: string;
	priceRange: string;
	verified: boolean;
	superAgent: boolean;
	searchText?: string;
};

export function filterProperties(properties: any[], filter: Filter) {
	return properties.filter((property) => {
		// Search by name (case insensitive)
		if (
			filter.searchText &&
			!property.name.toLowerCase().includes(filter.searchText.toLowerCase())
		) {
			return false;
		}

		// Location filter (check if property.loction includes filter.location)
		if (
			filter.location &&
			!property.loction.toLowerCase().includes(filter.location.toLowerCase())
		) {
			return false;
		}

		// Property type filter
		if (filter.propertyType && property.type !== filter.propertyType) {
			return false;
		}

		// Bedrooms filter (match beds string)
		if (filter.bedrooms && property.beds !== filter.bedrooms) {
			return false;
		}

		// Price range filter
		if (filter.priceRange) {
			// Parse price from property.value (e.g., '৳6,700,000' -> 6700000)
			const priceNumber = Number(property.value.replace(/[^\d]/g, ''));

			// Define price ranges in numbers (adjust according to your ranges)
			const priceRanges: Record<string, [number, number]> = {
				'Less Than ৳1,200,000': [0, 1200000],
				'৳1,200,000 - ৳1,800,000': [1200000, 1800000],
				'৳1,440,000 - ৳3,000,000': [1440000, 3000000],
				'৳3,600,000 - ৳4,200,000': [3600000, 4200000],
				'৳4,800,000 - ৳5,400,000': [4800000, 5400000],
				'৳6,000,000 - ৳6,600,000': [6000000, 6600000],
				'৳7,200,000 - ৳7,800,000': [7200000, 7800000],
				'More Than ৳8,400,000': [8400000, Infinity],
			};

			const range = priceRanges[filter.priceRange];
			if (!range) return false;

			if (priceNumber < range[0] || priceNumber > range[1]) {
				return false;
			}
		}

		// Verified filter (assuming 'Verified' means tag includes 'Verified')
		if (filter.verified && !property.tag.includes('Verified')) {
			return false;
		}

		// SuperAgent filter (check if tag includes 'SuperAgent')
		if (filter.superAgent && !property.tag.includes('SuperAgent')) {
			return false;
		}

		return true;
	});
}
