<script lang="ts">
	import { currentRefStore } from '$lib/store';
	import { uploadFile } from '$lib/utils';
	import { FileDropzone, ProgressBar, getToastStore } from '@skeletonlabs/skeleton';
	import { getMaterialFileIcon } from 'file-extension-icon-js';
	import { getStorage, ref } from 'firebase/storage';
	import { get, writable } from 'svelte/store';

	export let parent: any;
	export let files: FileList | undefined = undefined;

	let currentRef = get(currentRefStore);
	let path = currentRef?.fullPath;

	let fileName = '';
	let progress = writable(0);
	$: if (files?.length) {
		fileName = files[0].name;
	}

	const toastStore = getToastStore();
	function submit() {
		if (!files) return;
		if (!currentRef) return;
		uploadFile(ref(getStorage(), path + '/' + fileName), files[0], toastStore, progress);
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
		<ProgressBar label="Progress Bar" value={$progress} max={100} />
	{/if}
	<footer class="modal-footer {parent.regionFooter}">
		<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>
			{parent.buttonTextCancel}
		</button>
		<button class="btn {parent.buttonPositive}" on:click={submit}>Submit</button>
	</footer>
</div>
