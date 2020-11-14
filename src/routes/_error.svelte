<script>
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { bounceOut } from 'svelte/easing';

	const messages = [
		"Wait what ?!",
		"Wrong way !",
		"Oh daim !",
		"It's a trap !",
		"WoOosh !",
		"BoOoing !",
		"OuUups !"
	];

	let active = false;
	let title = '';

	onMount(() => {
		title = messages[Math.floor(Math.random() * messages.length)];
		active = true;
	});
</script>

<svelte:head>
	<title>Reboot • Not found</title>
</svelte:head>

{#if active}
<div class="d-flex flex-column align-center justify-center" in:fly="{{ y: -800, duration: 1200, easing: bounceOut }}">
	<h1>{title}</h1>
	<img src="media/reboot-undercover-error.png" alt="404 not found" />
</div>
{/if}

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