<script lang="ts">
	import { modalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import type { ModalName } from '../../types';

	const component: ModalName = 'AddModel';
	const d: ModalSettings = {
		type: 'component',
		component
	};
</script>

<div>
	<button
		class="btn-icon variant-filled"
		on:click={() => {
			modalStore.trigger(d);
		}}>⬆️</button
	>
</div>
