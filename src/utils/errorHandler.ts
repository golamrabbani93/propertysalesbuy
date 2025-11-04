import {toast} from 'sonner';

export const errorHandler = <T extends (...args: any[]) => Promise<any>>(fn: T) => {
	return async (...args: Parameters<T>): Promise<ReturnType<T> | void> => {
		try {
			return await fn(...args);
		} catch (error: any) {
			console.error('❌ Async Error:', error);
		}
	};
};
