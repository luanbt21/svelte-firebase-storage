import { toastStore } from '@skeletonlabs/skeleton';

export const toastSuccess = (message: string) => {
	toastStore.trigger({
		background: 'variant-filled-success',
		message
	});
};

export const toastError = (message: string) => {
	toastStore.trigger({
		background: 'variant-filled-error',
		message
	});
};
