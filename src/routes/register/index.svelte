<script context="module">
	export async function preload(page, session) {
		let { user } = session;
		if (user) return (this.redirect(301, '/home'));
	}
</script>

<script>
	import FormRegister from '../../components/FormRegister.svelte';
	import Transitor from '../../components/Transitor.svelte';
</script>

<svelte:head>
	<title>Reboot • Register</title>
</svelte:head>

<Transitor>
	<FormRegister />
</Transitor>

<style>
</style>