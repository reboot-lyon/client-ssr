<script>
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { expoOut } from 'svelte/easing';
	import { goto, stores } from '@sapper/app';
	import { Avatar, Badge, Button, Divider, Icon, List, ListItem, Menu, Overlay, Subheader, TextField } from 'svelte-materialify/src';
	import { mdiMagnify, mdiTrophyVariant, mdiTournament, mdiChevronDown, mdiMenu, mdiCalendar, mdiArrowCollapseLeft, mdiArrowRight, mdiClose } from '@mdi/js';
	import { delProxy } from 'utils.js';
	import NavButton from './NavButton.svelte';
	import Showcase from './Showcase.svelte';

	export let segment;

	const { session } = stores();

	const logout = async() => {
		const res = await delProxy('/auth');
		if (res.user !== undefined) {
			$session.user = res.user;
			await goto('/');
		}
	};
	let windowWidth;
	let menuActive = false;

	onMount(() => {
		console.log('segment', segment);
	});
</script>

<svelte:window bind:innerWidth="{windowWidth}" />


{#if segment !== 'sign' && segment !== 'register'}
	{#if !$session.user}
		<Showcase>
			<nav class="navbar-user">
				{#if windowWidth < 560}
					<div class="d-flex flex-row align-stretch cover-mob" on:click="{async () => {await goto('/')}}">
						<NavButton style="width: 80px;" icon="{mdiMenu}" on:click="{async() => {menuActive = true}}" />
					</div>
				{:else}
					<div class="cover ml-12" on:click="{async () => {await goto('/')}}" />
					<div class="d-flex flex-row align-stretch">
						<NavButton active="{segment === 'events' ? true : false}"icon="{mdiCalendar}" text="Events" on:click="{async() => {await goto('/events')}}" />
						<NavButton active="{segment === 'leaderboards' ? true : false}" icon="{mdiTrophyVariant}" text="Leaderboards" on:click="{async() => {await goto('/leaderboards')}}" />
						<NavButton active="{segment === 'tournaments' ? true : false}" icon="{mdiTournament}" text="Tournaments" on:click="{async() => {await goto('/tournaments')}}" />
					</div>
					<div style="flex-grow:1; background: #272727;"/>
					<div style="flex-grow:1; max-width: 400px;">
						<div class="d-flex align-center">
							<TextField class="navbar-user-search primary-text" flat placeholder="Search">
								<div slot="append">
									<Icon path="{mdiMagnify}" />
								</div>
							</TextField>
						</div>
					</div>
					{#if !$session.user}
						<div class="d-flex flex-row align-stretch">
							<NavButton color="primary-color" style="width: 100px;" text="Sign-in" on:click="{async() => await goto('/sign')}" />
							<NavButton style="width: 100px;" text="Register" on:click="{async() => await goto('/register')}" />
						</div>
					{:else}
						<div class="d-flex flex-row align-stretch">
							<Menu right transition="{fly}" inOpts="{{ y: -100, duration: 800, easing: expoOut }}" style="background: #272727; box-shadow: none;" tile top >
								<div slot="activator">
									<Button class="pl-4" style="width: 120px; height: 60px;" depressed tile>
										<div class="d-flex flex-row justify-center align-stretch mr-1">
											<Badge class="primary-color white-text mr-10" dot bottom offsetX="{10}" offsetY="{10}">
												<Avatar size="{45}"><img src="//picsum.photos/50" alt="profile" /></Avatar>
											</Badge>
										</div>
										<div class="d-flex flex-row justify-center align-stretch ml-1">
											<Icon path="{mdiChevronDown}" />
										</div>
									</Button>
								</div>
								<List style="width: 200px;">
									<ListItem>Option 1</ListItem>
									<ListItem>Option 2</ListItem>
									<ListItem>Option 3</ListItem>
									<Divider />
									<ListItem on:click="{logout}">Logout</ListItem>
								</List>
							</Menu>
						</div>
					{/if}
				{/if}
			</nav>
		</Showcase>
	{:else} 
	{/if}
	{#if menuActive}
		<Overlay class="d-flex flex-row" fadeOptions="{{duration: 300}}" opacity="{0.95}" index="{11}" active="{menuActive}">
			<nav class="navbar-user">
				<NavButton color="red" style="width: 80px;" icon="{mdiClose}" on:click="{async() => {menuActive = false}}" />
			</nav>
			<List class="d-flex flex-column justify-center align-stretch" style="width: 100vw;">
				<Subheader>Menu</Subheader>
				<ListItem active="{segment === 'events' ? true : false}" on:click="{async() => {menuActive = false; await goto('/events')}}">
					<span slot="prepend">
						<Icon path="{mdiCalendar}" />
					</span>
					Events
				</ListItem>
				<ListItem>Option 2</ListItem>
				<ListItem>Option 3</ListItem>
				<Divider />
				<ListItem on:click="{logout}">Logout</ListItem>
			</List>
		</Overlay>
	{/if}
{:else}
	<Showcase>
		<nav class="navbar-user">
			<div class="d-flex flex-row align-stretch">
				<NavButton color="grey darken-4" icon="{mdiArrowCollapseLeft}" text="Back" on:click="{async() => await goto('/')}" />
			</div>
		</nav>
	</Showcase>
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

	div.cover {
		background: center / auto 60px no-repeat url("/media/reboot-undercover-mob.png");
		cursor: pointer;
		height: 60px;
		width: 220px;
	}
	@media (min-width: 1050px) {
		div.cover {
			background: center / contain no-repeat url("/media/reboot-undercover-menu.png");
			cursor: pointer;
			height: 60px;
			width: 240px;
		}
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
		top: 0;
		left: 0;
	}
	div.cover-mob {
		width: 100%;
		height: 100%;
		background: right / contain no-repeat url("/media/reboot-undercover-menu.png");
		cursor: pointer;
	}
</style>