<script>
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { expoOut } from 'svelte/easing';
	import { goto, stores } from '@sapper/app';
	import Badge from 'svelte-materialify/src/components/Badge/Badge.svelte';
	import Container from 'svelte-materialify/src/components/Grid/Container.svelte';
	import Row from 'svelte-materialify/src/components/Grid/Row.svelte';
	import Col from 'svelte-materialify/src/components/Grid/Col.svelte';
	import List from 'svelte-materialify/src/components/List/List.svelte';
	import ListItem from 'svelte-materialify/src/components/List/ListItem.svelte';
	import Avatar from 'svelte-materialify/src/components/Avatar/Avatar.svelte';
	import Tabs from 'svelte-materialify/src/components/Tabs/Tabs.svelte';
	import Tab from 'svelte-materialify/src/components/Tabs/Tab.svelte';
	import Divider from 'svelte-materialify/src/components/Divider/Divider.svelte';
	import Icon from 'svelte-materialify/src/components/Icon/Icon.svelte';
	import { mdiHome, mdiTrophy, mdiAccount, mdiLogout, mdiCalendarText } from '@mdi/js';

	export let segment;
	export let user = false;

	const { session } = stores();


	/*const logout = async() => {
		const res = await delProxy('/auth/logout');
		if (res.user !== undefined) {
			$session.user = res.user;
			await goto('/');
		}
	};*/
	let hide = true;

	onMount(() => {
		hide = false;
	});
</script>

{#if !hide}
<nav class="navbar-user" in:fly="{{ y: -200, duration: 800, easing: expoOut }}">
	<div class="icon" on:click="{() => {goto('/')}}">
		<img src="media/reboot-undercover.png" style="max-width: 60px;" alt="logo" />
	</div>
	<div style="flex-grow:1" />
	<div right class="pl-12 pr-12">
	{#if !user}
		<div right>hello</div>
	{:else}
		<Badge class="primary-color grey-text" value="{2}" offsetX="{16}" offsetY="{16}">
			<Avatar size="{40}"><img src="//picsum.photos/50" alt="profile" /></Avatar>
		</Badge>
	{/if}
	</div>
</nav>
{/if}

<style type="text/scss">
	@import 'svelte-materialify/src/styles/tools/colors';

	nav.navbar-user { 	
		position: fixed;
		display: flex;
		flex-direction: row;
		align-items: stretch;
		width: 100%;
		background: material-color('grey', 'darken-3');
		z-index: 10;
		height: 70px;
	}
	nav.navbar-user > .icon {
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		border: 1px solid red;
	}
	nav.navbar-user > div {
		margin: 0 32px 0 32px;
	}
</style>