<script lang="ts">
	import { clipboard, toastStore } from '@skeletonlabs/skeleton';
	import { getMaterialFileIcon } from 'file-extension-icon-js';
	import { getDownloadURL, getMetadata, type StorageReference } from 'firebase/storage';

	export let item: StorageReference;

	const toastSuccess = () => {
		toastStore.trigger({
			background: 'variant-filled-success',
			message: 'url copied'
		});
	};
</script>

<li>
	<img src={getMaterialFileIcon(item.name)} alt="file icon" width="24" />

	<span>{item.name}</span>

	{#await getDownloadURL(item) then url}
		<div class="btn-group variant-filled">
			<a href={url} title="Download file" target="_blank" download>⬇️</a>
			<button use:clipboard={url} on:click={toastSuccess} title="Copy link">📋</button>
		</div>
	{/await}

	{#await getMetadata(item) then value}
		<pre>{JSON.stringify(value, null, 2)}</pre>
	{/await}
</li>
