// make prefecth for banners
import {propertyManagementApi} from '@/redux/features/property/propertyManagementApi';
import {store} from '@/redux/store';

export async function prefetchProperties() {
	// Create a new store instance
	const dispatch = store.dispatch;
	await dispatch(propertyManagementApi.endpoints.getAllProperties.initiate(''));
	return store.getState(); // the state will contain the properties
}
