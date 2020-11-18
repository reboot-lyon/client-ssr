<script>
	import MaterialApp from 'svelte-materialify/src/components/MaterialApp/MaterialApp.svelte';
	import Nav from '../components/Nav.svelte';

	export let segment;
</script>

<MaterialApp theme="dark">
	<Nav segment="{segment}" />
	<main>
		<content>
			<slot />
		</content>
	</main>
</MaterialApp>

<style>
	content {
		display: block;
		width: 100%;
		padding: 1em;
		margin: 0 auto;
		box-sizing: border-box;
	}
	main {
		display: flex;
		padding: 60px 0 0 0;
		height: 100vh;
	}
</style>