<script>
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import { expoInOut } from 'svelte/easing';

	export let hide = true;
	export let easing = expoInOut;

	onMount(() => {
		hide = false;
	});
</script>

{#if !hide}
	<div in:scale="{{ y: -200, duration: 800, easing }}">
		<slot />
	</div>
{/if}