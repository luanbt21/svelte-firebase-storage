<script lang="ts">
	import TreeView from './TreeView.svelte';
	import { Accordion } from '@skeletonlabs/skeleton';
	import { listAll, type StorageReference } from 'firebase/storage';
	import FilesView from './FilesView.svelte';
	import FolderView from './FolderView.svelte';

	interface Props {
		storageRef: StorageReference;
	}

	let { storageRef }: Props = $props();
</script>

{#await listAll(storageRef)}
	{#each new Array(5) as _}
		<div class="placeholder mb-2 h-8 animate-pulse"></div>
	{/each}
{:then {prefixes, items }}
	{#if prefixes.length}
		<Accordion>
			{#each prefixes as prefix}
				<FolderView {prefix}>
					<TreeView storageRef={prefix} />
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
