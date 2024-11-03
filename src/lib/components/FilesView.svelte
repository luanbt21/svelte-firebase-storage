<script lang="ts">
	import type { StorageReference } from 'firebase/storage';
	import FileView from './FileView.svelte';

	interface Props {
		items: StorageReference[];
	}

	const { items }: Props = $props();
</script>

<ul class="list ml-3">
	{#each items as item}
		<FileView {item} />
	{/each}
</ul>
