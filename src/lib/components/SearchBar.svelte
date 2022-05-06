<script lang="ts">
	import Icon from "svelte-materialify/src/components/Icon/Icon.svelte";
	import { mdiMagnify } from "@mdi/js";

	export let style = "";
</script>

<div class="search-wrapper grey darken-3" style="{style}">
	<div class="search">
		<input class="bar" type="text" placeholder="Search" on:keypress />
		<div style="flex-grow: 1;"></div>
		<Icon path="{mdiMagnify}" />
	</div>
</div>

<style>
	.search-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		justify-items: end;
		height: 60px;
		width: 75%;
		background: #272727;
		transition: 200ms ease-in-out;
	}

	.search-wrapper:focus-within {
		width: 100%;
	}

	.search {
		display: flex;
		flex-direction: row;
		padding: 0 8px 0 8px;
	}

	.bar {
		color: white;
		display: flex;
		width: calc(100% - 25px);
		padding: 0 5px 0 5px;
		transition: 200ms ease-in-out;
		outline: none;
	}
</style>
