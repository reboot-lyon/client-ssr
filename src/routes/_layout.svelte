<script context="module">
	export async function preload(page, session) {
		let { user } = session;
		if (user) return (this.redirect(301, '/home'));
		else return ({ user });
	}
</script>

<script>
	import MaterialApp from 'svelte-materialify/src/components/MaterialApp/MaterialApp.svelte';
	import Nav from '../components/Nav.svelte';

	export let segment;
	export let user;
</script>

<MaterialApp theme="dark">
	<Nav user="{user}" segment="{segment}" />
	<div class="d-flex justify-center" style="height: 100vh;">
		<slot />
	</div>
</MaterialApp>