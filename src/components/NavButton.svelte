<script>
	import { fade } from 'svelte/transition';
	import { expoOut } from 'svelte/easing';
	import { Button, Icon } from 'svelte-materialify/src';

	export let activeClass="primary-color";
	export let color = "";
	export let icon = null;
	export let text = null;
	export let active = false;
	export let style = "";
</script>

<Button class="{color} pl-4 pr-4" style="width: 10em; height: 60px; {style}" ripple="{false}" {activeClass} depressed tile on:click>
	<div class="wrapper">
		<div class="items">
			{#if icon}<Icon path="{icon}" />{/if}
		</div>
		<div class="items">
			{#if text}<p class="text-body-2 title">{text}</p>{/if}
		</div>
		{#if active}<div transition:fade="{{duration: 800, easing: expoOut}}" class="border" />{/if}
	</div>
</Button>

<style type="text/scss">
	@import 'svelte-materialify/src/styles/tools/colors';	

	div.wrapper {
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		width: 100%;
	}
	div.items {
		display: flex;
		justify-content: center;
	}
	p.title {
		padding: 0;
		margin: 0;
		text-transform: none;
	}
	div.border {
		height: 2px;
		width: 100%;
		background: material-color('amber', 'darken-3');
	}
</style>