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

	const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;	

	const passwd = {
		show: false,
		value: undefined
	};
	const email = {
		show: false,
		value: undefined,
		sent: false,
		error: false,
		hint: ''
	};

	const card = {
		loading: false,
		disabled: false
	};

	const sendAuth = async() => {
		if (pattern.test(email.value) && passwd.value !== '') {
			toggleCard();
			const res = await postProxy('/auth', { email: email.value, passwd: passwd.value });
			if (res.user) {
				$session.user = res.user;
				await goto('/home');
			} else {
				passwd.value = '';
				email.error = true;
				email.hint = 'Invalid Email or Password';
				toggleCard();
			}
		} else {
			email.error = true;
			email.hint = 'Invalid Email';
		}
	};

	const sendForgotMail = async() => {
		if (pattern.test(email.value)) {
			email.error = false;
			email.hint = '';
			toggleCard();
			const res = await postProxy('/forgot', { email: email.value });
			if (res.success) {
				email.sent = true;
			} else {
				email.error = true;
				email.hint = 'Invalid Email';
			}
			toggleCard();
		} else {
			email.error = true;
			email.hint = 'Invalid Email';
		}
	}

	const toggleForgotPasswd = () => {
		email.show = !email.show;
		email.value = '';
		email.sent = false;
		email.error = false;
		email.hint = '';
		email.value = '';
		passwd.value = '';
	};

	const toggleCard = () => {
		card.loading = !card.loading;
		card.disabled = !card.disabled;
	}
</script>

<div class="login">
	<Card class="d-flex flex-row" bind:loading="{card.loading}" disabled="{card.disabled}">
		<CardTitle class="d-flex justify-center">
			<img src="media/reboot-undercover.png" style="max-width: 300px;" alt="background" />
		</CardTitle>
		{#if !email.show}
		<CardText>
			<div in:fly="{{ y: -200, duration: 800, esaing: expoInOut }}">
				<TextField filled clearable bind:error="{email.error}" bind:hint="{email.hint}" validateOnBlur="{true}" bind:value="{email.value}">
					Email
					<div slot="prepend">
						<Icon path="{ mdiEmail }" />
					</div>
				</TextField>
				<TextField filled type="{passwd.show ? 'text' : 'password'}" bind:value="{passwd.value}">
					Password
					<div slot="append" on:click="{() => { passwd.show = !passwd.show; }}">
						<Icon path="{ passwd.show ? mdiEyeOff : mdiEye }"></Icon>
					</div>
					<div slot="prepend">
						<Icon path="{ mdiLock }" />
					</div>
				</TextField>
				<div class="d-flex justify-center">
					<p class="forgot-password" on:click="{toggleForgotPasswd}">Forgot password</p>
				</div>
			</div>
		</CardText>
		<CardActions class="d-flex justify-center">
			<Button block depressed size="x-large" on:click="{sendAuth}">
				<Icon class="mr-4" path="{ mdiLoginVariant }" />
				Login
			</Button>
		</CardActions>
		{:else}
		<CardText>
			<div in:fly="{{ y: -200, duration: 800, esaing: expoInOut }}">
				<TextField filled clearable bind:error="{email.error}" bind:hint="{email.hint}" bind:value="{email.value}">
					Email
					<div slot="prepend">
						<Icon path="{ mdiEmail }" />
					</div>
				</TextField>
				<div class="d-flex justify-center">
					<p class="forgot-password" on:click="{toggleForgotPasswd}" href="#/">Sign in</p>
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

	p.forgot-password {
		color: cornflowerblue;
		cursor: pointer;
		text-decoration: underline;
	}

	.login {
		min-width: 300px;
	}

	@media (min-width: 480px) {
		.login {
			min-width: 450px;
		}
	}
</style>