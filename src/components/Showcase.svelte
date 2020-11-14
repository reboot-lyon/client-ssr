<script>
    import { onMount } from 'svelte';
    import { expoOut } from 'svelte/easing';
    import { fly, scale } from 'svelte/transition';

    let active = false;

    onMount(() => {
        active = true;
    });
</script>

{#if active}
<div in:fly="{{ y: -800, duration: 1200, easing: expoOut }}">
    <slot />
</div>
{/if}