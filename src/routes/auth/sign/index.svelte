<script context="module">
	export async function preload(page, session) {
		let { user } = session;
		if (user) return (this.redirect(301, '/home'));
	}
</script>

<script>
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { bounceInOut, bounceOut, expoInOut } from 'svelte/easing';
	import Login from '../../../components/Login.svelte';
	
	export let active = false;

	onMount(() => {
		active = true;
	});
</script>

<svelte:head>
	<title>Reboot • Sign-in</title>
</svelte:head>

<div class="d-flex justify-center" style="height: 100vh">
	<div class="align-self-center">
		{#if active}
			<div in:fly="{{ y: -800, duration: 1600, easing: bounceOut }}">
				<Login />
			</div>
		{/if}
	</div>
</div>