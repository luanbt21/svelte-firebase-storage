<script lang="ts">
	import { CHANGE_EVENT } from '$lib/constants';
	import { toast } from '$lib/utils';
	import { clipboard, getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import { getMaterialFileIcon } from 'file-extension-icon-js';
	import { deleteObject, getDownloadURL, type StorageReference } from 'firebase/storage';

	export let item: StorageReference;
	const toastStore = getToastStore();
	const modalStore = getModalStore();

	function deleteFile() {
		modalStore.trigger({
			type: 'confirm',
			title: 'Are you sure you want to delete this file?',
			body: item.name,
			response: async (r: boolean) => {
				if (r) {
					await deleteObject(item);
					document.dispatchEvent(new CustomEvent(CHANGE_EVENT));
				}
			}
		});
	}
</script>

<li>
	<img src={getMaterialFileIcon(item.name)} alt="file icon" class="w-6" />

	<a href={'/' + item.fullPath}>{item.name}</a>

	{#await getDownloadURL(item) then url}
		<div class="variant-filled btn-group">
			<a href={url} title="Download file" target="_blank" download>⬇️</a>
			<button
				use:clipboard={url}
				on:click={() => toast(toastStore, 'success', 'url copied')}
				title="Copy link"
			>
				📋
			</button>
			<button on:click={deleteFile}> ❌ </button>
		</div>
	{/await}
</li>
