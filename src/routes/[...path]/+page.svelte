<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import AddButton from '$lib/components/AddButton.svelte';
	import TreeView from '$lib/components/TreeView.svelte';
	import { currentRefStore } from '$lib/store';
	import { LightSwitch, drawerStore } from '@skeletonlabs/skeleton';
	import { getStorage, ref } from 'firebase/storage';

	const storageRef = ref(getStorage());
	$currentRefStore = storageRef;

	$: if (browser && $page.url.pathname != '/') {
		$currentRefStore = ref(storageRef, $page.url.pathname.replaceAll('%20', ' '));
		drawerStore.open({
			position: 'bottom',
			meta: { ref: $currentRefStore }
		});
	}
</script>

<TreeView {storageRef} />
<div class="absolute bottom-4 right-4 gap-2 text-center">
	<AddButton />
	<LightSwitch />
</div>
