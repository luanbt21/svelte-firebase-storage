<script lang="ts">
	import { goto } from '$app/navigation';
	import '../app.postcss';

	import { Drawer, Modal, Toast, initializeStores, getDrawerStore } from '@skeletonlabs/skeleton';
	import { getMaterialFileIcon } from 'file-extension-icon-js';
	import { initializeApp } from 'firebase/app';
	import { getDownloadURL, type FullMetadata } from 'firebase/storage';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	const firebaseConfig = {
		apiKey: 'AIzaSyCCKiy9Hl5P4WCjoS0OBBrBALW3VbOVrxk',
		authDomain: 'data-5c712.firebaseapp.com',
		projectId: 'data-5c712',
		storageBucket: 'data-5c712.appspot.com',
		messagingSenderId: '562721089026',
		appId: '1:562721089026:web:efabb8b9a3358a45bf691b'
	};

	initializeApp(firebaseConfig);
	initializeStores();

	// let key = 'ok';
	let key = $state('');

	const drawerStore = getDrawerStore();
	let fullMetadata: FullMetadata | undefined = $state();
	$effect(() => {
		if ($drawerStore?.meta) {
			fullMetadata = $drawerStore.meta.fullMetadata;
		}
	});
</script>

<div class="container mx-auto overflow-auto">
	{#if key.toLowerCase() === 'ok'}
		{@render children?.()}
	{:else}
		<input class="input h-full p-2" type="text" bind:value={key} autofocus />
	{/if}
</div>

<Toast max={5} position="t" />
<Modal />
<Drawer
	on:backdrop={() => {
		goto('/');
	}}
>
	{#if fullMetadata}
		<div class="mx-auto flex h-full max-w-max flex-col p-2">
			<h3>
				<img
					src={getMaterialFileIcon(fullMetadata.name)}
					alt="file icon"
					class="inline-block"
					width="24"
				/>
				{fullMetadata.name}
			</h3>
			{#if fullMetadata.ref}
				{#await getDownloadURL(fullMetadata.ref) then src}
					{#if fullMetadata.contentType?.includes('image/')}
						<img class="mx-auto mb-2" {src} alt="preview" />
					{/if}

					<div class="ml-3 flex h-full flex-col justify-evenly">
						<div>
							<span class="variant-filled badge">Size</span>
							{fullMetadata.size} bytes
						</div>

						<div>
							<span class="variant-filled badge">Type</span>
							{fullMetadata.contentType}
						</div>

						<div>
							<span class="variant-filled badge">Created</span>
							{new Date(fullMetadata.timeCreated).toLocaleString()}
						</div>

						<div>
							<span class="variant-filled badge">Updated</span>
							{new Date(fullMetadata.updated).toLocaleString()}
						</div>

						<div>
							<span class="variant-filled badge">Download</span>

							<a
								class="variant-filled btn-sm"
								href={src}
								title="Download file"
								target="_blank"
								download>⬇️</a
							>
						</div>
					</div>
				{/await}
			{/if}
		</div>
	{/if}
</Drawer>
