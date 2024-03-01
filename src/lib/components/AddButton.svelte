<script lang="ts">
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import AddModel from './AddModel.svelte';
	import { toast } from '$lib/utils';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	const modalStore = getModalStore();
	const toastStore = getToastStore();

	onMount(() => {
		document.addEventListener('paste', (event) => {
			if (!event.clipboardData?.files.length && !get(modalStore).length) {
				toast(toastStore, 'warning', 'You have not yet copied a file!!');
			}

			if (event.clipboardData?.files.length) {
				event.preventDefault();
				showModal(event.clipboardData?.files);
			}
		});
	});

	const showModal = (files?: FileList) => {
		modalStore.set([
			{
				type: 'component',
				component: { ref: AddModel, props: { files } }
			}
		]);
	};
</script>

<div>
	<button class="variant-filled btn-icon btn-lg mb-2" on:click={() => showModal()}> ⬆ </button>
</div>
