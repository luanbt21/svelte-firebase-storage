<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-modern.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/all.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';

	import { Drawer, Modal, Toast, drawerStore } from '@skeletonlabs/skeleton';
	import { getMaterialFileIcon } from 'file-extension-icon-js';
	import { initializeApp } from 'firebase/app';
	import { getDownloadURL, getMetadata, type StorageReference } from 'firebase/storage';

	const firebaseConfig = {
		apiKey: 'AIzaSyCCKiy9Hl5P4WCjoS0OBBrBALW3VbOVrxk',
		authDomain: 'data-5c712.firebaseapp.com',
		projectId: 'data-5c712',
		storageBucket: 'data-5c712.appspot.com',
		messagingSenderId: '562721089026',
		appId: '1:562721089026:web:efabb8b9a3358a45bf691b'
	};

	initializeApp(firebaseConfig);

	let ref: StorageReference | undefined;
	$: if ($drawerStore && $drawerStore.meta) {
		ref = $drawerStore.meta.ref;
	}
</script>

<div class="h-full overflow-auto">
	<div class="m-1">
		<slot />
	</div>
</div>

<Toast />
<Modal />
<Drawer>
	{#if ref}
		<div class="mx-auto flex h-full max-w-max flex-col p-2">
			<h3>
				<img src={getMaterialFileIcon(ref.name)} alt="file icon" class="inline-block" width="24" />
				{ref.name}
			</h3>
			{#await getMetadata(ref) then meta}
				{#await getDownloadURL(ref) then src}
					{#if meta.contentType?.includes('image/')}
						<img class="mx-auto mb-2" {src} alt="preview" />
					{/if}

					<div class="ml-3 flex h-full flex-col justify-evenly">
						<div>
							<span class="badge variant-filled">Size</span>
							{meta.size} bytes
						</div>

						<div>
							<span class="badge variant-filled">Type</span>
							{meta.contentType}
						</div>

						<div>
							<span class="badge variant-filled">Created</span>
							{new Date(meta.timeCreated).toLocaleString()}
						</div>

						<div>
							<span class="badge variant-filled">Updated</span>
							{new Date(meta.updated).toLocaleString()}
						</div>

						<div>
							<span class="badge variant-filled">Download</span>

							<a
								class="btn-sm variant-filled"
								href={src}
								title="Download file"
								target="_blank"
								download>⬇️</a
							>
						</div>
					</div>
				{/await}
			{/await}
		</div>
	{/if}
</Drawer>
