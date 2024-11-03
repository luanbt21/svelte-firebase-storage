<script lang="ts">
	import { formatBytes, uploadFile } from '$lib/utils';
	import { ProgressRadial, getToastStore } from '@skeletonlabs/skeleton';
	import { getMaterialFileIcon } from 'file-extension-icon-js';
	import { type StorageReference } from 'firebase/storage';
	import { writable } from 'svelte/store';

	interface Props {
		file: File;
		storageRef: StorageReference;
		remove: () => void;
	}

	let { file, storageRef, remove }: Props = $props();

	let progress = writable(0);

	const toastStore = getToastStore();
	export function upload() {
		uploadFile(storageRef, file, toastStore, progress);
	}
</script>

<li class="mb-2 flex h-8 gap-1 border-b">
	<p class="flex-1 truncate">
		<img src={getMaterialFileIcon(file.name)} alt="file icon" class="inline w-6" />
		{file.name}
	</p>
	{#if $progress}
		{#if $progress === 100}
			<span class="variant-filled-success badge">✅</span>
		{:else}
			<ProgressRadial font={100} width="w-8" value={$progress} }>
				{$progress.toFixed(0)}%
			</ProgressRadial>
		{/if}
	{:else}
		<span class="variant-filled badge">{formatBytes(file.size)}</span>
		<button class="variant-filled-primary btn-icon" onclick={upload}>⬆️</button>
		<button class="variant-filled-warning btn-icon" onclick={remove}>❌</button>
	{/if}
</li>
