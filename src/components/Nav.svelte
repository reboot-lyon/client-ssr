<script>
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { expoOut } from 'svelte/easing';
	import { goto, stores } from '@sapper/app';
	import { Avatar, Badge, Button, Divider, Icon, TextField } from 'svelte-materialify/src';
	import { mdiHome, mdiTrophy, mdiAccount, mdiLogout, mdiCalendarText, mdiMapCheck, mdiManjaro, mdiSearchWeb, mdiMagnify, mdiCalendarBlankOutline, mdiTrophyVariant, mdiTournament, mdiArrowCollapse, mdiArrowCollapseDown, mdiChevronDown } from '@mdi/js';

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
	let value;
	$: console.log(value);

	let active = false;

	onMount(() => {
		active = true;
		console.log('segment', segment);
	});
</script>

{#if active && segment !== 'auth'}
<nav class="navbar-user" in:fly="{{ y: -200, duration: 800, easing: expoOut }}">
	<div class="cover ml-12" on:click="{async () => {await goto('/')}}">
		<img src="media/reboot-undercover2.png" style="max-height: 60px;" alt="logo" />
	</div>
	<div class="d-flex flex-row align-stretch">
		<Button class="pl-8 pr-8" style="width: 200px; height: 60px;" depressed tile on:click="{async() => {await goto('/events')}}">
			<div class="d-flex flex-column justify-center">
				<Icon path="{mdiCalendarBlankOutline}" />
				<p class="title">Events</p>
			</div>
		</Button>
		<Button class="pl-8 pr-8" style="width: 200px; height: 60px;" depressed tile on:click="{async() => {await goto('/leaderboards')}}">
			<div class="d-flex flex-column justify-center">
				<Icon path="{mdiTrophyVariant}" />
				<p class="title">Leaderboard</p>
			</div>
		</Button>
		<Button class="pl-8 pr-8" style="width: 200px; height: 60px;" depressed tile on:click="{async() => {await goto('/tournaments')}}">
			<div class="d-flex flex-column justify-center">
				<Icon path="{mdiTournament}" />
				<p class="title">Tournament</p>
			</div>
		</Button>
	</div>
	<div style="flex-grow:1; background: #272727;" />
	<div style="flex-grow:1; max-width: 400;">
		<div class="d-flex align-center">
			<TextField class="navbar-user-search primary-text" flat placeholder="Search">
				<div slot="append">
					<Icon path="{mdiMagnify}" />
				</div>
			</TextField>
		</div>
	</div>
	{#if !user}
	<div class="d-flex flex-row align-stretch">
		<Button class="pl-8 pr-8" style="max-width: 120px; height: 60px;" depressed tile on:click="{async() => {await goto('/auth/sign')}}">
			Sign in
		</Button>
		<Button class="pl-8 pr-8" style="max-width: 120px; height: 60px;" depressed tile on:click="{async() => {await goto('/auth/register')}}">
			Register
		</Button>
	</div>
	{:else}
	<div class="d-flex flex-row align-stretch">
		<Button class="pl-8" style="width: 120px; height: 60px;" depressed tile on:click="{async() => {value = true}}">
			<div class="d-flex flex-row justify-center align-stretch">
				<Badge class="primary-color white-text" dot bottom offsetX="{10}" offsetY="{10}">
					<Avatar size="{45}"><img src="//picsum.photos/50" alt="profile" /></Avatar>
				</Badge>
				<Icon path="{mdiChevronDown}" />
			</div>
		</Button>
	</div>
	{/if}
</nav>
{/if}

<style type="text/scss">
	@import 'svelte-materialify/src/styles/tools/colors';

	:global(.navbar-user-tab) {
		height: 60px !important;
		margin: 0 !important;
		padding: 0 !important;
	}
	:global(.navbar-user-search) {
		height: 60px !important;
	}
	nav.navbar-user { 	
		position: fixed;
		display: flex;
		flex-direction: row;
		align-items: stretch;
		width: 100%;
		background: material-color('grey', 'darken-4');
		z-index: 10;
		height: 60px;
	}
	nav.navbar-user > div.cover {
		cursor: pointer;
	}
	p.title {
		padding: 0;
		margin: 0;
		text-transform: none;
	}
</style>