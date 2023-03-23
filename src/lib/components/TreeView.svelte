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
	});
</script>

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
