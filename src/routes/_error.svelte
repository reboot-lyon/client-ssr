<script>
	import { onMount } from 'svelte';
	import Showcase from '../components/Showcase.svelte';

	const messages = [
		"Wait what ?!",
		"Wrong way !",
		"Oh daim !",
		"It's a trap !",
		"WoOosh !",
		"BoOoing !",
		"OuUups !"
	];

	let title = '';

	onMount(() => {
		title = messages[Math.floor(Math.random() * messages.length)];
	});
</script>

<svelte:head>
	<title>Reboot • Not found</title>
</svelte:head>

<Showcase>
	<div class="d-flex flex-column align-center justify-center">
		<h1>{title}</h1>
		<img src="media/reboot-undercover-error.png" alt="404 not found" />
	</div>
</Showcase>

<style>
	img {
		max-height: 300px;
	}
	h1 {
		font-weight: 900;
		font-size: 40px;
		text-align: center;
	}
	@media (min-width: 560px) {
		img {
			max-height: 500px;
		}
		h1 {
			font-weight: 900;
			font-size: 70px;
			text-align: center;
		}
	}
</style>