<script lang="ts">
	import { currentRefStore } from '$lib/store';
	import { isFile, toast } from '$lib/utils';
	import { Accordion, AccordionItem, FileDropzone, getToastStore } from '@skeletonlabs/skeleton';
	import { getMaterialFileIcon } from 'file-extension-icon-js';
	import { getStorage, ref } from 'firebase/storage';
	import { onMount } from 'svelte';
	import UploadFile from './UploadFile.svelte';
	import { uploadFiles, isDragging } from '$lib/store';

	let open = false;
	$: if (!open) {
		open = $isDragging;
	}

	let ignoreFiles: File[] = [];

	let path = $currentRefStore?.fullPath;

	let childRefs: UploadFile[] = [];

	const toastStore = getToastStore();

	function clear() {
		$uploadFiles = [];
		ignoreFiles = [];
	}

	function removeFile(idx: number) {
		$uploadFiles.splice(idx, 1);
		$uploadFiles = $uploadFiles;
	}

	function onChange(event: Event) {
		const e = event.target as HTMLInputElement;
		if (e.files) {
			filterFiles(e.files);
		}
	}

	function filterFiles(fileList: FileList) {
		const inputFiles = Array.from(fileList);
		$uploadFiles = inputFiles.filter((file) => isFile(file));
		if ($uploadFiles.length !== inputFiles.length) {
			ignoreFiles = inputFiles.filter((file) => !isFile(file));
			toast(toastStore, 'warning', 'Folders or unknown files will be ignore, please check!');
		}
	}

	function uploadAll() {
		if (!$uploadFiles) return;
		if (!$currentRefStore) return;
		for (const child of childRefs) {
			child.upload();
		}
	}

	onMount(() => {
		document.addEventListener('paste', (event): void => {
			if (event.clipboardData?.files.length) {
				event.preventDefault();
				filterFiles(event.clipboardData.files);
				open = true;
			} else {
				toast(toastStore, 'warning', 'You have not yet copied a file!!');
			}
		});
	});
</script>

<Accordion class="rounded-3xl bg-surface-600">
	<AccordionItem bind:open>
		<svelte:fragment slot="lead">⬆</svelte:fragment>
		<svelte:fragment slot="summary">Upload Files</svelte:fragment>
		<svelte:fragment slot="content">
			<label class="label">
				<span>Path</span>
				<input
					class="input p-2"
					type="text"
					placeholder="Enter path here"
					value={$currentRefStore?.fullPath}
					on:change={(e) => {
						path = e.currentTarget.value;
					}}
				/>
			</label>
			<FileDropzone name="files" multiple on:change={onChange}>
				<svelte:fragment slot="lead">
					<img
						src={getMaterialFileIcon('')}
						alt="file icon"
						class="mx-auto w-10"
						class:animate-shake={$isDragging}
					/>
				</svelte:fragment>

				<svelte:fragment slot="message">
					{#if $isDragging}
						<strong>Drop!!! I will catch it</strong>
					{:else if $uploadFiles?.length}
						{$uploadFiles.length} files will be upload!
					{:else}
						<strong>Upload files</strong> or drag and drop
					{/if}
				</svelte:fragment>
			</FileDropzone>

			{#if $uploadFiles?.length}
				<div class="m-4">
					<ul class="max-h-60 overflow-y-scroll">
						{#each $uploadFiles as file, i}
							<UploadFile
								remove={() => {
									removeFile(i);
								}}
								bind:this={childRefs[i]}
								{file}
								storageRef={ref(getStorage(), path + '/' + file.name)}
							/>
						{/each}
					</ul>
				</div>
			{/if}

			<div class="flex place-content-evenly">
				<button type="button" class="variant-filled-warning btn" on:click={clear}>Clear</button>
				<button type="button" class="variant-filled-primary btn" on:click={uploadAll}>
					Upload all
				</button>
			</div>
		</svelte:fragment>
	</AccordionItem>
</Accordion>
