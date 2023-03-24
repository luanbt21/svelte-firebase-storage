<script lang="ts">
	export let parent: any;

	import { modalStore } from '@skeletonlabs/skeleton';

	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
</script>

<div class="modal-example-form {cBase}">
	<header class={cHeader}>{$modalStore[0]?.title ?? '(title missing)'}</header>
	<article>{$modalStore[0]?.body ?? '(body missing)'}</article>

	<!-- prettier-ignore -->
	<footer class="modal-footer {parent.regionFooter}">
        <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
        <button class="btn {parent.buttonPositive}">Submit Form</button>
    </footer>
</div>
