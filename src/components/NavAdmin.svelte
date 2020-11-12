<script>
	import { goto, stores } from '@sapper/app';
	import NavigationDrawer from 'svelte-materialify/src/components/NavigationDrawer/NavigationDrawer.svelte';
	import Badge from 'svelte-materialify/src/components/Badge/Badge.svelte';
	import List from 'svelte-materialify/src/components/List/List.svelte';
	import ListItem from 'svelte-materialify/src/components/List/ListItem.svelte';
	import Avatar from 'svelte-materialify/src/components/Avatar/Avatar.svelte';
	import Divider from 'svelte-materialify/src/components/Divider/Divider.svelte';
	import Icon from 'svelte-materialify/src/components/Icon/Icon.svelte';
	import { mdiHome, mdiTrophy, mdiAccount, mdiLogout, mdiCalendarText } from '@mdi/js';
	import { delProxy } from 'utils';

	export let segment;

	const { session } = stores();

	let mini = true;

	const mouseEnter = () => {
		mini = false;
	};

	const mouseLeave = () => {
		mini = true;
	};

	const logout = async() => {
		const res = await delProxy('/auth/logout');
		if (res.user !== undefined) {
			$session.user = res.user;
			await goto('/');
		}
	};
</script>

<div class="d-flex justify-center" on:mouseenter="{mouseEnter}" on:mouseleave="{mouseLeave}" on:click="{mouseEnter}">
	<NavigationDrawer class="primary-color" {mini}>
		<List nav>
			<ListItem active="{segment === 'profile' ? 'page' : undefined}" on:click="{() => goto('/home/profile')}">
				<span slot="prepend" class="ml-n2">
					<Badge class="primary-color" bordered dot offsetX={28} offsetY={18} bottom>
						<Avatar size="{40}"><img src="//picsum.photos/200" alt="profile" /></Avatar>
					</Badge>
				</span>
				Mudit Somani
			</ListItem>
		</List>
		<Divider />
		<List nav>
			<ListItem active="{segment === undefined ? 'page' : undefined}" on:click="{() => goto('/home')}">
				<span slot="prepend">
					<Icon path="{mdiHome}" />
				</span>
				Home
			</ListItem>
			<ListItem active="{segment === 'events' ? 'page' : undefined}" on:click="{() => goto('/home/events')}">
				<span slot="prepend">
					<Icon path="{mdiCalendarText}" />
				</span>
				Events
			</ListItem>
			<ListItem active="{segment === 'tournaments' ? 'page' : undefined}" on:click="{() => goto('/home/tounaments')}">
				<span slot="prepend">
					<Icon path="{mdiTrophy}" />
				</span>
				Tounaments
			</ListItem>
			<ListItem active="{segment === 'players' ? 'page' : undefined}" on:click="{() => goto('/home/players')}">
				<span slot="prepend">
					<Icon path="{mdiAccount}" />
				</span>
				Players
			</ListItem>
		</List>
		<span slot="append">
			<Divider />
			<List nav>
				<ListItem on:click="{logout}">
					<span slot="prepend">
						<Icon path="{mdiLogout}" />
					</span>
					Logout
				</ListItem>
			</List>
		</span>
	</NavigationDrawer>
</div>

<style>
</style>