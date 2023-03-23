<script lang="ts">
	import {
		Accordion,
		AccordionItem,
		ListBox,
		ListBoxItem,
		toastStore
	} from '@skeletonlabs/skeleton';

	import { getDownloadURL, listAll, ref, type StorageReference } from 'firebase/storage';
	import { onMount } from 'svelte';

	export let storageRef: StorageReference;

	let loading = true;

	let prefixes: StorageReference[] = [];
	let items: StorageReference[] = [];

	let selectItem: StorageReference;

	$: if (selectItem) {
		toastStore.trigger({
			message: selectItem.name
		});
	}

	onMount(async () => {
		({ prefixes, items } = await listAll(storageRef));
		loading = false;
	});
</script>

{#if loading}
	{#each new Array(5) as _}
		<div class="placeholder animate-pulse h-8 mb-2" />
	{/each}
{/if}

{#if prefixes.length}
	<Accordion>
		{#each prefixes as prefix}
			<AccordionItem>
				<svelte:fragment slot="lead">(dir)</svelte:fragment>
				<svelte:fragment slot="summary">{prefix.name}</svelte:fragment>

				<svelte:fragment slot="content">
					<svelte:self storageRef={prefix} />
				</svelte:fragment>
			</AccordionItem>
		{/each}
	</Accordion>
{/if}

{#if items.length}
	<ListBox>
		{#each items as item}
			<ListBoxItem bind:group={selectItem} name="medium" value={item}>{item.name}</ListBoxItem>
		{/each}
	</ListBox>
{/if}

{#if !loading && !prefixes.length && !items.length}
	<h5 class="ml-4">This folder is empty</h5>
{/if}
