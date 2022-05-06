<script lang="ts">
	import { fly } from "svelte/transition";
	import { expoOut } from "svelte/easing";

	import { goto } from "$app/navigation";
	import { page, session } from "$app/stores";

	import {
		Avatar,
		Badge,
		Button,
		Divider,
		Icon,
		List,
		ListItem,
		Menu,
		Overlay,
		Subheader,
		Tabs,
		Tab
	} from "svelte-materialify/src";

	import {
		mdiTrophyVariant,
		mdiTournament,
		mdiChevronDown,
		mdiMenu,
		mdiCalendar,
		mdiArrowCollapseLeft,
		mdiArrowRight,
		mdiClose,
		mdiArrowCollapseDown,
		mdiHome
	} from "@mdi/js";

	import { delProxy } from "$lib/utils/api";

	import Transitor from "./Transitor.svelte";
	import SearchBar from "./SearchBar.svelte";

	const currentPath: string = $page.url.pathname;
	const jwt = $session.jwt;

	let navCur = 0;

	const navLinks = ["/", "/events", "/leagues", "/matchs"];

	const logout = async () => {
		const res = await delProxy("/auth/sign");
		if (res.ok) {
			await goto("/");
		}
	};

	const navGo = async ({ detail }) => {
		await goto(navLinks[detail]);
	};

	let windowWidth: number;
	let menuActive = false;

	$: navCur = currentPath
		? navLinks.indexOf(`${currentPath}`) > -1
			? navLinks.indexOf(`${currentPath}`)
			: 0
		: 0;
</script>

<svelte:window bind:innerWidth="{windowWidth}" />

<Transitor inOpts="{{ y: -200, duration: 300 }}">
	<nav class="navbar-user">
		{#if windowWidth < 820}
			<div class="d-flex flex-row" style="width: 100%;">
				<Button
					class="primary-color"
					depressed
					flat
					tile
					style="height: 60px;"
					on:click="{async () => {
						menuActive = true;
					}}"
				>
					<Icon path="{mdiMenu}" />
				</Button>
				<div class="cover-mob" style="flex-grow: 1;"></div>
			</div>
		{:else}
			<div class="cover"></div>
			<div class="d-flex flex-row align-stretch" style="flex-grow: 1;">
				<Tabs
					class="navbar-user-search primary-text"
					bind:value="{navCur}"
					showArrows="{false}"
					grow
					on:change="{navGo}"
				>
					<div slot="tabs">
						<Tab>Home</Tab>
						<Tab>Events</Tab>
						<Tab>Leagues</Tab>
						<Tab>Matchs</Tab>
					</div>
				</Tabs>
			</div>
			<div class="d-flex flex-row justify-end">
				<SearchBar />
			</div>
			<div class="d-flex flex-row align-stretch">
				{#if !jwt}
					<Button
						class="primary-color"
						style="height: 60px;"
						on:click="{async () => await goto('/auth/sign')}"
						depressed
						tile
					>
						Sign-in
					</Button>
					<Button
						style="height: 60px;"
						on:click="{async () => await goto('/auth/register')}"
						depressed
						tile
					>
						Register
					</Button>
				{:else}
					<Menu
						style="background: #272727; box-shadow: none;"
						transition="{fly}"
						inOpts="{{ y: -100, duration: 800, easing: expoOut }}"
						closeOnClick="{false}"
						tile
						right
					>
						<div slot="activator">
							<Button class="pl-4" style="width: 120px; height: 60px;" depressed tile>
								<div class="d-flex flex-row justify-center align-stretch mr-1">
									<Badge
										class="primary-color white-text mr-10"
										dot
										bottom
										offsetX="{10}"
										offsetY="{10}"
									>
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
							<ListItem>Admin panel</ListItem>
							<Divider />
							<ListItem on:click="{async () => await logout()}">Logout</ListItem>
						</List>
					</Menu>
				{/if}
			</div>
		{/if}
	</nav>
</Transitor>
{#if menuActive}
	<Overlay
		style="align-items: stretch;"
		transition="{fly}"
		inOpts="{{ y: -200, duration: 800 }}"
		outOpts="{{ y: -200, duration: 800 }}"
		opacity="{1}"
		index="{11}"
		active="{menuActive}"
	>
		<nav class="navbar-user-mob">
			<Button
				class="red base"
				depressed
				flat
				tile
				style="height: 60px;"
				on:click="{async () => {
					menuActive = false;
				}}"
			>
				<Icon path="{mdiClose}" />
			</Button>
			<SearchBar style="border-radius: 2px;" />
		</nav>
		<List class="d-flex flex-column justify-center align-stretch pa-0" style="width: 100vw;">
			<Subheader class="text-body-1">Yugioh</Subheader>
			<ListItem
				activeClass="primary-color"
				active="{currentPath === undefined ? true : false}"
				on:click="{async () => {
					menuActive = false;
					await goto('/');
				}}"
			>
				<span slot="prepend">
					<Icon path="{mdiHome}" />
				</span>
				Home
			</ListItem>
			<ListItem
				activeClass="primary-color"
				active="{currentPath === 'events' ? true : false}"
				on:click="{async () => {
					menuActive = false;
					await goto('/events');
				}}"
			>
				<span slot="prepend">
					<Icon path="{mdiCalendar}" />
				</span>
				Events
			</ListItem>
			<ListItem
				activeClass="primary-color"
				active="{currentPath === 'leagues' ? true : false}"
				on:click="{async () => {
					menuActive = false;
					await goto('/leagues');
				}}"
			>
				<span slot="prepend">
					<Icon path="{mdiTrophyVariant}" />
				</span>
				Leagues
			</ListItem>
			<ListItem
				activeClass="primary-color"
				active="{currentPath === 'matchs' ? true : false}"
				on:click="{async () => {
					menuActive = false;
					await goto('/matchs');
				}}"
			>
				<span slot="prepend">
					<Icon path="{mdiTournament}" />
				</span>
				Matchs
			</ListItem>
			<Divider />
			<Subheader class="text-body-1">User</Subheader>
			{#if !jwt}
				<ListItem
					activeClass="primary-color"
					on:click="{async () => {
						menuActive = false;
						await goto('/auth/sign');
					}}"
				>
					<span slot="prepend">
						<Icon path="{mdiArrowRight}" />
					</span>
					Sign-in
				</ListItem>
				<ListItem
					activeClass="primary-color"
					on:click="{async () => {
						menuActive = false;
						await goto('/auth/register');
					}}"
				>
					<span slot="prepend">
						<Icon path="{mdiArrowCollapseDown}" />
					</span>
					Register
				</ListItem>
			{:else}
				<ListItem
					activeClass="primary-color"
					on:click="{async () => {
						menuActive = false;
						logout();
					}}"
				>
					<span slot="prepend">
						<Icon path="{mdiArrowCollapseLeft}" />
					</span>
					Logout
				</ListItem>
			{/if}
		</List>
	</Overlay>
{/if}

<style type="text/scss">
	:global(.navbar-user-tab) {
		height: 60px !important;
		margin: 0 !important;
		padding: 0 !important;
	}
	:global(.navbar-user-search) {
		height: 60px !important;
		background: #272727;
	}

	div.cover {
		background: center / auto 60px no-repeat url("/media/reboot-undercover-mob.png");
		height: 60px;
		width: 235px;
		margin: 0 0 0 8px;
	}

	div.cover-mob {
		width: 240px;
		height: 60px;
		background: center / 240px 60px no-repeat url("/media/reboot-undercover-menu.png");
	}

	@media (min-width: 1150px) {
		div.cover {
			margin: 0 0 0 32px;
			background: center / contain no-repeat url("/media/reboot-undercover-menu.png");
		}
	}

	nav.navbar-user {
		position: fixed;
		display: flex;
		flex-direction: row;
		align-items: stretch;
		width: 100%;
		background: #272727;
		z-index: 10;
		height: 60px;
	}

	nav.navbar-user-mob {
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: stretch;
		width: 100%;
		background: #272727;
		z-index: 10;
		height: 60px;
	}

	nav.back-cover {
		background: #212121;
	}
</style>
