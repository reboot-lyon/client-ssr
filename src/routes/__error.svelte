<script type="ts" context="module">
	import type { Load } from "@sveltejs/kit";

	export const load: Load = ({ error, status }) => {
		return {
			props: {
				title: error?.name,
				status
			}
		};
	};
</script>

<script lang="ts">
	import Transitor from "$components/Transitor.svelte";

	export let title: string;
	export let status: number;
</script>

<svelte:head>
	<title>Reboot • {status}</title>
</svelte:head>

<Transitor>
	<div class="d-flex flex-column align-center justify-center">
		<h1>{title}</h1>
		<img src="/media/reboot-undercover-error.png" alt="{title}" />
	</div>
</Transitor>

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
