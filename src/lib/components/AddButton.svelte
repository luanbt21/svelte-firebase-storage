<script lang="ts">
	import { modalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import AddModel from './AddModel.svelte';

	const d: ModalSettings = {
		type: 'component',
		component: { ref: AddModel }
	};
</script>

<div>
	<button
		class="btn-icon variant-filled btn-lg mb-2"
		on:click={() => {
			modalStore.trigger(d);
		}}>⬆️</button
	>
</div>
