<script lang="ts">
	import { type StorageReference, getDownloadURL } from 'firebase/storage';
	import { clipboard, toastStore } from '@skeletonlabs/skeleton';
	import { getMaterialFileIcon } from 'file-extension-icon-js';

	export let items: StorageReference[];

	const toastSuccess = () => {
		toastStore.trigger({
			background: 'variant-filled-success',
			message: 'url copied'
		});
	};
</script>

<ul class="list ml-3">
	{#each items as item}
		<li>
			<img src={getMaterialFileIcon(item.name)} alt="file icon" width="24" />

			<span>{item.name}</span>

			{#await getDownloadURL(item) then url}
				<div class="btn-group variant-filled">
					<button title="Download file">⬇️</button>
					<button use:clipboard={url} on:click={toastSuccess} title="Copy link">📋</button>
				</div>
			{/await}
		</li>
	{/each}
</ul>
