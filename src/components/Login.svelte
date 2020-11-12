<script>
	import { fly } from 'svelte/transition';
	import { expoInOut } from 'svelte/easing';
	import { goto, stores } from '@sapper/app';
	import Icon from 'svelte-materialify/src/components/Icon/Icon.svelte';
	import TextField from 'svelte-materialify/src/components/TextField/TextField.svelte';
	import Card from 'svelte-materialify/src/components/Card/Card.svelte';
	import CardActions from 'svelte-materialify/src/components/Card/CardActions.svelte';
	import CardTitle from 'svelte-materialify/src/components/Card/CardTitle.svelte';
	import CardText from 'svelte-materialify/src/components/Card/CardText.svelte';
	import Button from 'svelte-materialify/src/components/Button/Button.svelte';
	import { mdiEmail, mdiEye, mdiEyeOff, mdiLock, mdiLoginVariant, mdiMail } from '@mdi/js';
	import { postProxy } from 'utils';

	const { session } = stores();

	let forgotPasswd = false;

	const passwd = {
		show: false,
		value: undefined
	};
	const email = {
		error: true,
		value: undefined,
		rules: [
			(v) => !!v || 'Required',
			(v) => v.length <= 25 || 'Max 25 characters',
			(v) => {
				const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				return pattern.test(v) || 'Invalid e-mail.';
			},
		],
		hint: ''
	};

	const forgotEmail = {
		error: true,
		value: undefined,
		rules: [
			(v) => !!v || 'Required',
			(v) => v.length <= 25 || 'Max 25 characters',
			(v) => {
				const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				return pattern.test(v) || 'Invalid e-mail.';
			},
		],
		hint: ''
	};

	const card = {
		loading: false,
		disabled: false
	};

	const checkAuth = async() => {
		if (!email.error && email.value !== '' && passwd.value !== '') {
			card.loading = true;
			card.disabled = true;
			const res = await postProxy('/auth/login', { email: email.value, passwd: passwd.value });
			if (res.user) {
				$session.user = res.user;
				await goto('/home');
			} else {
				passwd.value = '';
				email.hint = 'Invalid Email or Password';
				card.loading = false;
				card.disabled = false;
			}
		}
	};

	const sendForgotMail = async() => {
		console.log('sent');
	}

	const toggleForgotPasswd = () => {
		forgotPasswd = !forgotPasswd;
		email.value = '';
		forgotEmail.value = '';
		passwd.value = '';
	};
</script>

<div class="login">
	<Card class="d-flex flex-row" bind:loading="{card.loading}" disabled="{card.disabled}">
		<CardTitle class="d-flex justify-center">
			<img src="media/reboot-undercover.png" style="max-width: 300px;" alt="background" />
		</CardTitle>
		{#if !forgotPasswd}
		<CardText>
			<div in:fly="{{ y: -200, duration: 800, esaing: expoInOut }}">
				<TextField filled clearable rules="{email.rules}" bind:hint="{email.hint}" bind:error="{email.error}" bind:value="{email.value}">
					Email
					<div slot="prepend">
						<Icon path="{ mdiEmail }" />
					</div>
				</TextField>
				<TextField filled type="{passwd.show ? 'text' : 'password'}" on:change="{checkAuth}" bind:value="{passwd.value}">
					Password
					<div slot="append" on:click="{() => { passwd.show = !passwd.show; }}">
						<Icon path="{ passwd.show ? mdiEyeOff : mdiEye }"></Icon>
					</div>
					<div slot="prepend">
						<Icon path="{ mdiLock }" />
					</div>
				</TextField>
				<div class="d-flex justify-center">
					<a on:click="{toggleForgotPasswd}" href="#/">Forgot password</a>
				</div>
			</div>
		</CardText>
		<CardActions class="d-flex justify-center">
			<Button block depressed size="x-large" on:click="{checkAuth}">
				<Icon class="mr-4" path="{ mdiLoginVariant }" />
				Login
			</Button>
		</CardActions>
		{:else}
		<CardText>
			<div in:fly="{{ y: -200, duration: 800, esaing: expoInOut }}">
				<TextField filled clearable rules="{forgotEmail.rules}" bind:hint="{forgotEmail.hint}" bind:error="{forgotEmail.error}" bind:value="{forgotEmail.value}">
					Email
					<div slot="prepend">
						<Icon path="{ mdiEmail }" />
					</div>
				</TextField>
				<div class="d-flex justify-center">
					<a on:click="{toggleForgotPasswd}" href="#/">Back login</a>
				</div>
			</div>
		</CardText>
		<CardActions class="d-flex justify-center">
			<Button block depressed size="x-large" on:click="{sendForgotMail}">
				<Icon class="mr-4" path="{ mdiMail }" />
				Send Email
			</Button>
		</CardActions>
		{/if}
	</Card>
</div>

<style>

	.login {
		min-width: 300px;
	}

	@media (min-width: 480px) {
		.login {
			min-width: 450px;
		}
	}
</style>