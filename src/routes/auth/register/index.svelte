<script lang="ts" context="module">
	import type { Load } from "@sveltejs/kit";

	export const load: Load = async ({ session }) => {
		const { jwt } = session;

		if (jwt)
			return {
				status: 301,
				redirect: "/"
			};

		return {};
	};
</script>

<script lang="ts">
	import FormRegister from "$components/FormRegister.svelte";
	import Transitor from "$components/Transitor.svelte";
</script>

<svelte:head>
	<title>Reboot • Register</title>
</svelte:head>

<Transitor>
	<FormRegister />
</Transitor>

<style>
</style>
