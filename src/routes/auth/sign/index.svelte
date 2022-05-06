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
	import FormLogin from "$components/FormLogin.svelte";
	import Transitor from "$components/Transitor.svelte";
</script>

<svelte:head>
	<title>Reboot • Sign-in</title>
</svelte:head>

<div class="d-flex justify-center align-self-center">
	<Transitor>
		<FormLogin />
	</Transitor>
</div>
