<script context="module">
	export async function preload(page, session) {
		let { user } = session;
		if (user) return (this.redirect(301, '/home'));
	}
</script>

<script>
	import Register from '../../components/Register.svelte';
	import Showcase from '../../components/Showcase.svelte';
</script>

<svelte:head>
	<title>Reboot • Register</title>
</svelte:head>

<div class="d-flex justify-center align-self-center">
	<Showcase>
		<Register />
	</Showcase>
</div>

<style>
</style>