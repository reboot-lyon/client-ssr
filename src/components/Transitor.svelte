<script>
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	export let transition = fly;
	export let inOpts = { x: 200, duration: 300 };
	let active = false;

	onMount(() => {
		active = true;
	});
</script>

{#if active}
	<div in:transition="{inOpts}">
		<slot />
	</div>
{/if}

<style>
</style>