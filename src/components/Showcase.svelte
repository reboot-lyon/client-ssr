<script>
	import { onMount } from 'svelte';
	import { expoOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	export let transition = fly;
	export let opts = { y: -400, duration: 800, easing: expoOut };
	let active = false;

	onMount(() => {
		active = true;
	});
</script>

{#if active}
<div in:transition="{opts}">
	<slot />
</div>
{/if}