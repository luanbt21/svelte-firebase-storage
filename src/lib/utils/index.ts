import { CHANGE_EVENT } from '$lib/constants';
import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
import { type StorageReference, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import type { Writable } from 'svelte/store';

const ToastType = {
	success: 'variant-filled-success',
	error: 'variant-filled-error',
	warning: 'variant-filled-warning'
};

export function toast(
	store: ReturnType<typeof getToastStore>,
	type: keyof typeof ToastType,
	message: string
) {
	store.trigger({
		background: ToastType[type],
		message
	});
}

export function formatBytes(bytes: number, decimals = 2): string {
	if (bytes == 0) return '0 Bytes';
	const k = 1024;
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	const base = Math.floor(Math.log(bytes) / Math.log(k));
	return parseFloat((bytes / Math.pow(k, base)).toFixed(decimals)) + ' ' + sizes[base];
}

export function isFile(file: File) {
	return !!file.type || file.name.endsWith('.iso');
}

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
