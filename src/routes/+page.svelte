<script lang="ts">
	import { getDownloadURL, getStorage, listAll, ref } from 'firebase/storage';
	import { onMount } from 'svelte';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import TreeView from '$lib/components/TreeView.svelte';

	const storageRef = ref(getStorage());
</script>

<TreeView {storageRef} />


