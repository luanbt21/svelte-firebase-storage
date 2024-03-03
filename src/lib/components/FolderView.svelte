<script lang="ts">
	import { AccordionItem } from '@skeletonlabs/skeleton';
	import { getMaterialFolderIcon } from 'file-extension-icon-js';
	import type { StorageReference } from 'firebase/storage';
	import { currentRefStore } from '$lib/store';

	export let prefix: StorageReference;
	let open = false;

	$: if (open) {
		currentRefStore.set(prefix);
	} else {
		currentRefStore.set(prefix.parent);
	}
</script>

<AccordionItem on:toggle={({ detail }) => (open = detail.open)}>
	<svelte:fragment slot="lead">
		<img src={getMaterialFolderIcon(prefix.name, open)} alt="folder icon" width="24" />
	</svelte:fragment>
	<svelte:fragment slot="summary">{prefix.name}</svelte:fragment>

	<svelte:fragment slot="content">
		<slot />
	</svelte:fragment>
</AccordionItem>
