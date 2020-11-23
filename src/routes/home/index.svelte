<script context="module">
	export async function preload(page, session) {
		let { user } = session;
		if (!user) return (this.redirect(302, '/'));
	}
</script>

<script>
	import Transitor from '../../components/Transitor.svelte';
</script>

<svelte:head>
	<title>Reboot • Home</title>
</svelte:head>

<Transitor>
	<h1>Great success!</h1>
	<figure>
		<img alt='Success Kid' src='favicon.png'>
		<figcaption>Have fun with Sapper!</figcaption>
	</figure>
	<p><strong>Try editing this file (src/routes/index.svelte) to test live reloading.</strong></p>
</Transitor>

<style>
	h1, figure, p {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	figure {
		margin: 0 0 1em 0;
	}

	img {
		width: 100%;
		max-width: 200px;
		margin: 0 0 1em 0;
	}

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>