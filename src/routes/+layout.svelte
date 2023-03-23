<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-modern.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/all.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import 'file-icons-js/css/style.css';

	import { initializeApp } from 'firebase/app';
	import { Toast } from '@skeletonlabs/skeleton';

	const firebaseConfig = {
		apiKey: 'AIzaSyCCKiy9Hl5P4WCjoS0OBBrBALW3VbOVrxk',
		authDomain: 'data-5c712.firebaseapp.com',
		projectId: 'data-5c712',
		storageBucket: 'data-5c712.appspot.com',
		messagingSenderId: '562721089026',
		appId: '1:562721089026:web:efabb8b9a3358a45bf691b'
	};

	initializeApp(firebaseConfig);
</script>

<div class="m-5">
	<slot />
</div>

<Toast />
