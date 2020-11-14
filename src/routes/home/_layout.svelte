<script context="module">
	export async function preload(page, session) {
		let { user } = session;
		if (!user) return (this.redirect(302, '/'));
	}
</script>

<script>
</script>

<main>
	<content>
		<slot></slot>
	</content>
</main>

<style>
	content {
		display: block;
		position: relative;
		max-width: 56em;
		padding: 5em;
		margin: 0 auto;
		box-sizing: border-box;
	}
	main {
		display: flex;
		height: 100vh;
	}
</style>