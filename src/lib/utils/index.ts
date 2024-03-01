import { CHANGE_EVENT } from '$lib/constants';
import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
import { type StorageReference, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import type { Writable } from 'svelte/store';

const ToastType = {
	success: 'variant-filled-success',
	error: 'variant-filled-error',
	warning: 'variant-filled-warning'
};

export const toast = (
	store: ReturnType<typeof getToastStore>,
	type: keyof typeof ToastType,
	message: string
) => {
	store.trigger({
		background: ToastType[type],
		message
	});
};

export function uploadFile(
	storageRef: StorageReference,
	file: File,
	toastStore: ReturnType<typeof getToastStore>,
	progress?: Writable<number>
) {
	const uploadTask = uploadBytesResumable(storageRef, file);

	uploadTask.on(
		'state_changed',
		(snapshot) => {
			if (progress) {
				progress.set((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
			}
		},
		(error) => {
			toast(toastStore, 'error', error.message);
		},
		async () => {
			const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
			toast(toastStore, 'success', `File uploaded successfully ${downloadURL}`);
			document.dispatchEvent(new CustomEvent(CHANGE_EVENT));
			getModalStore().close();
		}
	);
}
