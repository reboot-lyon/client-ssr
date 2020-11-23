<script>
	import { stores } from '@sapper/app';
	import MaterialApp from 'svelte-materialify/src/components/MaterialApp/MaterialApp.svelte';
	import Nav from '../components/Nav.svelte';

	export let segment;

	const { session } = stores();
</script>

<MaterialApp theme="dark">
	<Nav bind:segment bind:user="{$session.user}" />
	<main>
		<slot />
	</main>
</MaterialApp>

<style>

	main {
		padding: 76px 0 0 0;
		min-height: 100vh;
	}
</style>