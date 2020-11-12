<script>
	import MaterialApp from 'svelte-materialify/src/components/MaterialApp/MaterialApp.svelte';

	//export let segment;
	let theme = 'dark';
</script>

<MaterialApp {theme}>
	<slot />
</MaterialApp>