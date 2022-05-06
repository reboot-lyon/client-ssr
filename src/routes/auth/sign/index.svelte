<script context="module">
	export async function preload(page, session) {
		let { user } = session;
		if (user) return this.redirect(301, "/home");
	}
</script>

<script>
	import FormLogin from "$components/FormLogin.svelte";
	import Transitor from "$components/Transitor.svelte";
</script>

<svelte:head>
	<title>Reboot • Sign-in</title>
</svelte:head>

<div class="d-flex justify-center align-self-center">
	<Transitor>
		<FormLogin />
	</Transitor>
</div>
