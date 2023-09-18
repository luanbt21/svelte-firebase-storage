<script lang="ts">
	import { CHANGE_EVENT } from '$lib/constants';
	import { currentRefStore } from '$lib/store';
	import { toastError, toastSuccess } from '$lib/utils';
	import { FileDropzone, modalStore, ProgressBar } from '@skeletonlabs/skeleton';
	import { getMaterialFileIcon } from 'file-extension-icon-js';
	import {
		getDownloadURL,
		getStorage,
		ref,
		uploadBytesResumable,
		type StorageReference
	} from 'firebase/storage';
	import { get } from 'svelte/store';

	export let parent: any;

	let currentRef = get(currentRefStore);
	let path = currentRef?.fullPath;

	let files: FileList;
	let fileName = '';
	let progress = 0;

	$: if (files) {
		fileName = files[0].name;
	}

	function submit() {
		if (!files) return;
		if (!currentRef) return;
		uploadFile(ref(getStorage(), path + '/' + fileName), files[0]);
	}

	function uploadFile(storageRef: StorageReference, file: File) {
		const uploadTask = uploadBytesResumable(storageRef, file);

		uploadTask.on(
			'state_changed',
			(snapshot) => {
				progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			},
			(error) => {
				toastError(error.message);
			},
			async () => {
				const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
				toastSuccess(`File uploaded successfully ${downloadURL}`);
				document.dispatchEvent(new CustomEvent(CHANGE_EVENT));
				modalStore.close();
			}
		);
	}
</script>

<div class="card w-modal space-y-4 p-4 shadow-xl">
	<header class="text-2xl font-bold">Add File</header>
	<!-- <article>{$modalStore[0]?.body ?? '(body missing)'}</article> -->
	<label class="label">
		<span>Path</span>
		<input class="input p-2" type="text" placeholder="Enter path here" bind:value={path} />
	</label>
	<FileDropzone name="files" bind:files>
		<svelte:fragment slot="lead">
			<img src={getMaterialFileIcon(fileName)} alt="" class="mx-auto w-10" />
		</svelte:fragment>
		<svelte:fragment slot="message">
			{#if fileName}
				{fileName}
			{:else}
				<strong>Upload a file</strong> or drag and drop
			{/if}
		</svelte:fragment>
	</FileDropzone>

	{#if progress}
		<ProgressBar label="Progress Bar" value={progress} max={100} />
	{/if}
	<!-- prettier-ignore -->
	<footer class="modal-footer {parent.regionFooter}">
        <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
        <button class="btn {parent.buttonPositive}" on:click={submit}>Submit</button>
    </footer>
</div>
