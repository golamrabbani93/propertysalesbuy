'use client';

import {
	useGetAllTotalViewsQuery,
	useGetTotalViewByIdQuery,
	useUpdateTotalViewMutation,
} from '@/redux/features/totalViews/totalViewsManagementApi';
import {useEffect, useRef} from 'react';

const TotalViews = () => {
	const {data: property} = useGetTotalViewByIdQuery(1);
	const hasUpdatedRef = useRef(false);

	const [updateView] = useUpdateTotalViewMutation();

	useEffect(() => {
		const updateViewCount = async () => {
			if (property && !hasUpdatedRef.current) {
				const result = await updateView({
					id: property.id,
					data: {count: property.count + 1, name: property.name},
				});
				hasUpdatedRef.current = true; // mark as updated
			}
		};
		updateViewCount();
	}, [property]);
	return null;
};

export default TotalViews;
