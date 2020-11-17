<script>
	import { Icon } from 'svelte-materialify/src';
	import { mdiMagnify } from '@mdi/js';

	export let style='';
</script>

<div class="search-wrapper grey darken-3" style="{style}">
	<div class="search">
		<input class="bar" type="text" placeholder="Search" on:keypress />
		<div style="flex-grow: 1;" />
		<Icon path="{mdiMagnify}" />
	</div>
</div>

<style type="text/scss">
	div.search-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		justify-items: end;
		height: 60px;
		width: 50%;
		background: #272727;
		transition: 200ms ease-in-out;
	}
	div.search-wrapper:focus-within {
		width: 100%;
	}
	div.search {
		display: flex;
		flex-direction: row;
		padding: 0 8px 0 8px;
	}
	input.bar {
		color: white;
		display: flex;
		width: calc(100% - 25px);
		padding: 0 5px 0 5px;
		transition: 200ms ease-in-out;
	}
</style>