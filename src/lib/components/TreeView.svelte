<script lang="ts">
	import { Accordion } from '@skeletonlabs/skeleton';
	import { listAll, type StorageReference } from 'firebase/storage';
	import FilesView from './FilesView.svelte';
	import FolderView from './FolderView.svelte';

	export let storageRef: StorageReference;
</script>

{#await listAll(storageRef)}
	{#each new Array(5) as _}
		<div class="placeholder mb-2 h-8 animate-pulse" />
	{/each}
{:then { prefixes, items }}
	{#if prefixes.length}
		<Accordion>
			{#each prefixes as prefix}
				<FolderView {prefix}>
					<svelte:self storageRef={prefix} />
				</FolderView>
			{/each}
		</Accordion>
	{/if}

	{#if items.length}
		<FilesView {items} />
	{/if}

	{#if !prefixes.length && !items.length}
		<h5 class="ml-4">This folder is empty</h5>
	{/if}
{/await}
