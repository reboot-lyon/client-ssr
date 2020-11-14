<script context="module">
	export async function preload(page, session) {
		let { user } = session;
		if (user) return (this.redirect(301, '/home'));
	}
</script>

<script>

	//export let segment;
</script>

<svelte:head>
	<title>Reboot • Yugioh</title>
</svelte:head>

StartUp