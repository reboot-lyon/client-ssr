<script>
	import Showcase from '../../components/Showcase.svelte';
</script>

<svelte:head>
	<title>Reboot • Home</title>
</svelte:head>

<Showcase>
	<h1>Great success!</h1>
	<figure>
		<img alt='Success Kid' src='favicon.png'>
		<figcaption>Have fun with Sapper!</figcaption>
	</figure>
	<p><strong>Try editing this file (src/routes/index.svelte) to test live reloading.</strong></p>
</Showcase>

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
		max-width: 400px;
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