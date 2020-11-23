<script>
	import { fly } from 'svelte/transition';
	import { expoInOut } from 'svelte/easing';
	import { goto, stores } from '@sapper/app';
	import { Card, CardTitle, CardText, Icon, TextField } from 'svelte-materialify/src';
	import { mdiEmail, mdiEye, mdiEyeOff, mdiLock } from '@mdi/js';
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

	const sendAuth = async(e) => {
		if (e.key === 'Enter') {
			if (pattern.test(email.value) && passwd.value !== '') {
				toggleCard();
				const res = await postProxy('/auth/sign', { email: email.value, passwd: passwd.value });
				if (res.success) {
					$session.user = res.token;
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
		}
	};

	const sendForgotMail = async(e) => {
		if (e.key === 'Enter') {
			if (pattern.test(email.value)) {
				email.error = false;
				email.hint = '';
				toggleCard();
				const res = await postProxy('/auth/sign/forgot', { email: email.value });
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

<div class="login-form">
	<Card class="d-flex flex-row" style="background: none;" flat bind:loading="{card.loading}" disabled="{card.disabled}">
		<CardTitle class="d-flex justify-center">
			<div class="cover"/>
		</CardTitle>
		{#if !email.show}
			<CardText>
				<div in:fly="{{ y: -200, duration: 800, esaing: expoInOut }}">
					<TextField class="pt-8" filled type="email"autocomplete="email" clearable bind:error="{email.error}" bind:hint="{email.hint}" validateOnBlur="{true}" bind:value="{email.value}">
						Email
						<div slot="prepend">
							<Icon path="{ mdiEmail }" />
						</div>
					</TextField>
					<TextField class="pt-4" filled type="{passwd.show ? 'text' : 'password'}" bind:value="{passwd.value}" on:keypress="{(e) => sendAuth(e)}">
						Password
						<div slot="append" on:click="{() => { passwd.show = !passwd.show; }}">
							<Icon path="{ passwd.show ? mdiEyeOff : mdiEye }" />
						</div>
						<div slot="prepend">
							<Icon path="{ mdiLock }" />
						</div>
					</TextField>
					<div class="d-flex flex-row justify-center align-stretch">
						<p class="ml-4 mt-4 forgot-password" on:click="{toggleForgotPasswd}">Forgot password ?</p>
						<div style="flex-grow: 1;"/>
						<p class="mr-4 mt-4 forgot-password" on:click="{async() => await goto('/register')}">Not register ?</p>
					</div>
				</div>
			</CardText>
		{:else}
			<CardText>
				<div in:fly="{{ y: -200, duration: 800, esaing: expoInOut }}">
					<TextField class="pt-8" filled clearable type="email" autocomplete="email" bind:error="{email.error}" bind:hint="{email.hint}" bind:value="{email.value}" on:keypress="{(e) => sendForgotMail(e)}">
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
		{/if}
	</Card>
</div>

<style>
	p.forgot-password {
		color: cornflowerblue;
		cursor: pointer;
		text-decoration: underline;
	}

	div.login-form {
		min-width: 300px;
	}

	div.cover {
		background: center / contain no-repeat url("/media/reboot-undercover.png");
		width: 200px;
		height: 200px;
	}

	@media (min-width: 480px) {
		div.login-form {
			min-width: 450px;
			display: flex;
			flex-direction: column;
			justify-content: center;
		}

		div.cover {
			width: 300px;
			height: 300px;
		}
	}
</style>