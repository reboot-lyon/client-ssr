<script>
	import MaterialApp from 'svelte-materialify/src/components/MaterialApp/MaterialApp.svelte';
	import Nav from '../components/Nav.svelte';

	export let segment;
</script>

<MaterialApp theme="dark">
	<Nav segment="{segment}" />
	<main class="d-flex align-center justify-center">
		<content>
			<slot />
		</content>
	</main>
</MaterialApp>

<style>
	content {
		display: block;
		position: relative;
		max-width: 56em;
		margin: 0 auto;
		box-sizing: border-box;
	}
	main {
		display: flex;
		height: 100vh;
	}
</style>