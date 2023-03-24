<script lang="ts">
	import AddButton from '$lib/components/AddButton.svelte';
	import TreeView from '$lib/components/TreeView.svelte';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { getStorage, ref } from 'firebase/storage';

	const storageRef = ref(getStorage());
</script>

<TreeView {storageRef} />
<div class="absolute bottom-4 right-4 text-center gap-2">
	<AddButton />
	<LightSwitch />
</div>
