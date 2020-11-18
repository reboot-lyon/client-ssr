<script context="module">
	export async function preload(page, session) {
		let { user } = session;
		if (user) return (this.redirect(301, '/home'));
	}
</script>

<script>
	import Login from '../../components/Login.svelte';
	import Showcase from '../../components/Showcase.svelte';
</script>

<svelte:head>
	<title>Reboot • Sign-in</title>
</svelte:head>

<div class="d-flex justify-center align-self-center">
	<Showcase>
		<Login />
	</Showcase>
</div>