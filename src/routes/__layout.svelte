<script lang="ts">
	import MaterialApp from "svelte-materialify/src/components/MaterialApp/MaterialApp.svelte";
	import Nav from "$components/Nav.svelte";
</script>

<MaterialApp theme="dark">
	<Nav />
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
