<script lang="ts">
	import { browser } from '$app/environment';
	import { uploadFiles, isDragging } from '$lib/store';
	import { page } from '$app/stores';
	import TreeView from '$lib/components/TreeView.svelte';
	import UploadFiles from '$lib/components/UploadFiles.svelte';
	import { currentRefStore } from '$lib/store';
	import { LightSwitch, getDrawerStore, getToastStore } from '@skeletonlabs/skeleton';
	import { getMetadata, getStorage, ref } from 'firebase/storage';
	import { CHANGE_EVENT } from '$lib/constants';
	import { onMount } from 'svelte';
	import { toast } from '$lib/utils';

	let storageRef = ref(getStorage());
	$currentRefStore = storageRef;

	const drawerStore = getDrawerStore();
	const toastStore = getToastStore();
	$: if (browser && $page.url.pathname != '/') {
		const filePath = decodeURI($page.url.pathname);
		const reference = ref(storageRef, filePath);
		getMetadata(reference)
			.then((fullMetadata) => {
				drawerStore.open({
					position: 'bottom',
					meta: { fullMetadata }
				});
			})
			.catch((e: Error) => {
				toast(toastStore, 'error', `get data for ${filePath} have failed`);
				console.log(e.stack);
			});
	}

	function handleDragEnter(event: DragEvent) {
		event.preventDefault();
		$isDragging = true;
	}

	function handleDragLeave(event: DragEvent) {
		event.preventDefault();
		$isDragging = false;
	}

	function handleDragOver(event: DragEvent) {
		event.preventDefault();
		$isDragging = true;
	}

	function handleDrop(event: DragEvent) {
		event.preventDefault();
		$isDragging = false;
		$uploadFiles = Array.from(event.dataTransfer?.files ?? []);
	}

	const onChange = () => {
		storageRef = ref(getStorage());
	};

	onMount(() => {
		document.addEventListener(CHANGE_EVENT, onChange);
		return () => {
			document.removeEventListener(CHANGE_EVENT, onChange);
		};
	});
</script>

<div
	class="min-h-screen"
	on:dragenter={handleDragEnter}
	on:dragleave={handleDragLeave}
	on:dragover={handleDragOver}
	on:drop={handleDrop}
>
	<UploadFiles />
	<hr class="!border-t-8 !border-double" />

	<TreeView {storageRef} />
	<div class="absolute bottom-4 right-4 gap-2 text-center">
		<LightSwitch />
	</div>
</div>
