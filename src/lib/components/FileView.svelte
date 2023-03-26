<script lang="ts">
	import { toastSuccess } from '$lib/utils';
	import { clipboard } from '@skeletonlabs/skeleton';
	import { getMaterialFileIcon } from 'file-extension-icon-js';
	import { getDownloadURL, type StorageReference } from 'firebase/storage';

	export let item: StorageReference;
</script>

<li>
	<img src={getMaterialFileIcon(item.name)} alt="file icon" width="24" />

	<span>{item.name}</span>

	{#await getDownloadURL(item) then url}
		<div class="btn-group variant-filled">
			<a href={url} title="Download file" target="_blank" download>⬇️</a>
			<button use:clipboard={url} on:click={() => toastSuccess('url copied')} title="Copy link">
				📋
			</button>
		</div>
	{/await}

	<!-- {#await getMetadata(item) then value}
		<pre>{JSON.stringify(value, null, 2)}</pre>
	{/await} -->
</li>
