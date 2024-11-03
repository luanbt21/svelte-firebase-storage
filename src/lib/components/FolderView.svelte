<script lang="ts">
	import { AccordionItem } from '@skeletonlabs/skeleton';
	import { getMaterialFolderIcon } from 'file-extension-icon-js';
	import type { StorageReference } from 'firebase/storage';
	import { currentRefStore } from '$lib/store';

	interface Props {
		prefix: StorageReference;
		children?: import('svelte').Snippet;
	}

	let { prefix, children }: Props = $props();
	let open = $state(false);

	$effect(() => {
		if (open) {
			currentRefStore.set(prefix);
		} else {
			currentRefStore.set(prefix.parent);
		}
	});
</script>

<AccordionItem on:toggle={({ detail }) => (open = detail.open)}>
	{#snippet lead()}
		<img src={getMaterialFolderIcon(prefix.name, open)} alt="folder icon" width="24" />
	{/snippet}
	{#snippet summary()}
		{prefix.name}
	{/snippet}

	{#snippet content()}
		{@render children?.()}
	{/snippet}
</AccordionItem>
