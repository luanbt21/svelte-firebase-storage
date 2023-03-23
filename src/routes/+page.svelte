<script lang="ts">
	import { getStorage, ref } from 'firebase/storage';
	import TreeView from '$lib/components/TreeView.svelte';

	const storageRef = ref(getStorage());
</script>

<TreeView {storageRef} />
