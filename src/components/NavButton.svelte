<script>
	import { amber } from 'svelte-materialify/src/utils/colors';

	export let color = '#272727';
	export let text = null;
	export let active = false;
	export let style = '';
</script>

<button class="pl-4 pr-4" style="--theme-hover-color: {active ? amber['darken-4'] : '#383838' }; --theme-color: {active ? amber['darken-4'] : color}; {style}" on:click>
	<div class="wrapper">
		<div class="items">
			{#if text}<div class="text-button font-weight-bold text-capitalize">{text}</div>{/if}
		</div>
	</div>
</button>

<style type="text/scss">
	button {
		width: 10eme;
		height: 60px;
		background: var(--theme-color);
		transition: 200ms ease-in-out;
	}

	button:hover {
		background: var(--theme-hover-color);
	}

	div.wrapper {
		display: flex;
		flex-direction: column;
		width: 100%;
		align-items: center;
	}

	div.items {
		display: flex;
	}
</style>