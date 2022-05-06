<script lang="ts">
	import Button from "svelte-materialify/src/components/Button/Button.svelte";
	import Icon from "svelte-materialify/src/components/Icon/Icon.svelte";
	import ProgressCircular from "svelte-materialify/src/components/ProgressLinear/ProgressLinear.svelte";
	import TextField from "svelte-materialify/src/components/TextField/TextField.svelte";
	import Window from "svelte-materialify/src/components/Window/Window.svelte";
	import WindowItem from "svelte-materialify/src/components/Window/WindowItem.svelte";

	import {
		mdiArrowLeft,
		mdiArrowRight,
		mdiEyeOff,
		mdiEye,
		mdiCardAccountDetails,
		mdiEmail,
		mdiAccount,
		mdiCheckCircle
	} from "@mdi/js";

	import { postProxy, getProxy } from "$utils/api";

	let window: Window;
	let currentWindow = 0;

	const windows = [
		{
			title: "Enter Konami ID",
			values: {
				konamiid: ""
			},
			rules: {
				konamiid: [
					(v: string) => !!v || "Required",
					(v: string) => v[0] === "0" || 'Must start by "0"',
					(v: string) => v.length === 10 || "Must be 10 numbers",
					(v: string) => {
						const pattern = /^[0-9]*$/;
						return pattern.test(v) || "Numbers only";
					}
				]
			},
			errors: {
				konamiid: undefined
			}
		},
		{
			title: "Who are you ?",
			values: {
				firstname: undefined,
				lastname: undefined
			},
			rules: {
				firstname: [
					(v: string) => !!v || "Required",
					(v: string) => v.length <= 25 || "Max 25 characters",
					(v: string) => {
						const pattern = /^([a-zA-Z'àâéèêôùûçÀÂÉÈÔÙÛÇ -]{1,75})$/;
						return pattern.test(v) || "Characters only";
					}
				],
				lastname: [
					(v: string) => !!v || "Required",
					(v: string) => v.length <= 25 || "Max 25 characters",
					(v: string) => {
						const pattern = /^([a-zA-Z'àâéèêôùûçÀÂÉÈÔÙÛÇ -]{1,75})$/;
						return pattern.test(v) || "Characters only";
					}
				]
			},
			errors: {
				firstname: undefined,
				lastname: undefined
			}
		},
		{
			title: "Finalize account",
			show: {
				passwd: false,
				passwdConfirm: false
			},
			values: {
				email: undefined,
				passwd: undefined,
				passwdConfirm: undefined
			},
			rules: {
				email: [
					(v: string) => !!v || "Required",
					(v: string) => v.length <= 50 || "Max 50 characters",
					(v: string) => {
						const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
						return pattern.test(v) || "Invalid e-mail.";
					}
				],
				passwd: [
					(v: string) => !!v || "Required",
					(v: string) => v.length > 7 || "Min 8 characters",
					(v: string) => v.length <= 25 || "Max 25 characters",
					(v: string) => {
						const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
						return pattern.test(v) || "Must contain 1 number and 1 Uppercase character";
					}
				],
				passwdConfirm: [
					(v: string) => !!v || "Required",
					(v: string) => v.length > 7 || "Min 8 characters",
					(v: string) => v.length <= 25 || "Max 25 characters",
					(v: string) => {
						const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
						return pattern.test(v) || "Must contain 1 number and 1 Uppercase character";
					},
					(v: string) => v === windows[2].values.passwd || "Password not matching"
				]
			},
			errors: {
				email: undefined,
				passwd: undefined,
				passwdConfirm: undefined
			}
		},
		{
			title: "Almost done !",
			values: {
				register: false
			}
		}
	];

	let error = "";

	const sendForm = async () => {
		const res = await postProxy("/auth/register", {
			konamiid: windows[0].values.konamiid,
			firstname: windows[1].values.firstname,
			lastname: windows[1].values.lastname,
			email: windows[2].values.email,
			passwd: windows[2].values.passwd
		});
		if (res.ok) {
			windows[3].values.register = true;
		}
	};

	const sendCheckID = async () => {
		const konamiid = windows[0].values.konamiid;

		return await getProxy(`/auth/register?konamiid=${konamiid}`);
	};

	const sendCheckEmail = async () => {
		const res = await postProxy("/auth/register/check", {
			email: windows[2].values.email
		});
		return res.ok ? true : false;
	};

	const nextItem = async () => {
		switch (currentWindow) {
			case 0:
				if (windows[0].errors.konamiid) {
					error = "Invalid Konami ID";
					return;
				}

				const res = await sendCheckID();
				if (!res.ok) {
					error = res.statusText;
					return;
				}
				break;

			case 1:
				const values = windows[1].values;
				const errors = windows[1].errors;
				for (let key in values) {
					if (values[key] === "" || errors[key] !== false) {
						error = `Invalid ${key}`;
						return;
					}
				}
				break;

			case 2:
				const emailCheck = await sendCheckEmail();
				if (!emailCheck) {
					error = "Email already exist";
					return;
				} else {
					sendForm();
				}
				break;

			default:
				break;
		}
		error = "";
		window.next();
	};
</script>

<div class="register-form">
	<div class="wrapper-window-title">
		<h2>Register</h2>
		<hr class="mt-4" style="width: 100%;" />
		<h5 class="pt-4">{windows[currentWindow].title}</h5>
	</div>
	<div class="wrapper-window">
		<Window bind:this="{window}" bind:value="{currentWindow}" vertical continuous="{false}">
			<WindowItem>
				<div class="d-flex flex-column justify-center align-center">
					<div class="wrapper-card">
						<div class="konami-card">
							<div class="konami-card--border" style="justify-content: flex-start;">
								<div class="konami-card--title red-text text-darken-3">KONAMI</div>
							</div>
							<div class="konami-card--content red darken-3"></div>
							<div class="konami-card--border" style="justify-content: flex-end;">
								<div class="konami-card--title">
									{windows[0].values.konamiid || "Konami ID"}
								</div>
							</div>
						</div>
					</div>
					<div class="d-flex justify-center align-center pt-2 pb-2">
						<TextField
							filled
							clearable
							type="text"
							inputmode="tel"
							maxlength="10"
							bind:value="{windows[0].values.konamiid}"
							bind:error="{windows[0].errors.konamiid}"
							bind:rules="{windows[0].rules.konamiid}"
							on:keypress="{(e) => (e.key === 'Enter' ? nextItem() : null)}"
						>
							Konami ID
							<div slot="prepend">
								<Icon path="{mdiCardAccountDetails}" />
							</div>
							<div slot="append"></div>
						</TextField>
					</div>
				</div>
			</WindowItem>
			<WindowItem>
				<div class="wrapper-card">
					<div class="wrapper-text flex-column">
						<TextField
							filled
							type="text"
							inputmode="text"
							autocomplete="name"
							maxlength="25"
							bind:value="{windows[1].values.firstname}"
							bind:error="{windows[1].errors.firstname}"
							bind:rules="{windows[1].rules.firstname}"
						>
							Firstname
							<div slot="prepend">
								<Icon path="{mdiAccount}" />
							</div>
						</TextField>
					</div>
					<div class="wrapper-text flex-column">
						<TextField
							filled
							type="text"
							inputmode="text"
							autocomplete="family-name"
							maxlength="25"
							bind:value="{windows[1].values.lastname}"
							bind:error="{windows[1].errors.lastname}"
							bind:rules="{windows[1].rules.lastname}"
							on:keypress="{(e) => (e.key === 'Enter' ? nextItem() : null)}"
						>
							Lastname
							<div slot="prepend">
								<Icon path="{mdiAccount}" />
							</div>
						</TextField>
					</div>
				</div>
			</WindowItem>
			<WindowItem>
				<div class="wrapper-card">
					<div class="wrapper-text flex-column">
						<TextField
							filled
							type="email"
							inputmode="email"
							autocomplete="email"
							maxlength="50"
							bind:value="{windows[2].values.email}"
							bind:error="{windows[2].errors.email}"
							bind:rules="{windows[2].rules.email}"
						>
							E-mail
							<div slot="prepend">
								<Icon path="{mdiEmail}" />
							</div>
						</TextField>
					</div>
					<div class="wrapper-text flex-column">
						<TextField
							filled
							type="{windows[2].show.passwd ? 'text' : 'password'}"
							inputmode="text"
							autocomplete="new-password"
							maxlength="25"
							bind:value="{windows[2].values.passwd}"
							bind:error="{windows[2].errors.passwd}"
							bind:rules="{windows[2].rules.passwd}"
						>
							Password
							<div
								slot="append"
								on:click="{() => {
									windows[2].show.passwd = !windows[2].show.passwd;
								}}"
							>
								<Icon path="{windows[2].show.passwd ? mdiEyeOff : mdiEye}" />
							</div>
						</TextField>
					</div>
					<div class="wrapper-text flex-column">
						<TextField
							filled
							type="{windows[2].show.passwdConfirm ? 'text' : 'password'}"
							inputmode="text"
							autocomplete="new-password"
							maxlength="25"
							bind:value="{windows[2].values.passwdConfirm}"
							bind:error="{windows[2].errors.passwdConfirm}"
							bind:rules="{windows[2].rules.passwdConfirm}"
							on:keypress="{(e) => (e.key === 'Enter' ? nextItem() : null)}"
						>
							Confirm password
							<div
								slot="append"
								on:click="{() => {
									windows[2].show.passwdConfirm = !windows[2].show.passwdConfirm;
								}}"
							>
								<Icon path="{windows[2].show.passwdConfirm ? mdiEyeOff : mdiEye}" />
							</div>
						</TextField>
					</div>
				</div>
			</WindowItem>
			<WindowItem>
				<div class="d-flex justify-center align-center flex-column">
					{#if windows[3].values.register !== true}
						<div class="d-flex justify-center align-center pt-4 pb-4">
							<ProgressCircular indeterminate color="primary" />
						</div>
						<div class="d-flex justify-center align-center pt-4 pb-4">
							<h6>Sending E-mail ...</h6>
						</div>
					{:else}
						<div class="d-flex justify-center align-center pt-4 pb-4">
							<Icon class="success-text" size="64px" path="{mdiCheckCircle}" />
						</div>
						<div class="d-flex justify-center align-center pt-4 pb-4">
							<h6>Email Sent !</h6>
						</div>
						<div class="d-flex justify-center align-center pt-4 pb-4">
							<h6>Check {windows[2].values.email}</h6>
						</div>
					{/if}
				</div>
			</WindowItem>
		</Window>
	</div>
	{#if currentWindow < 3}
		<div class="error-text">
			{error ? error : ""}
		</div>
		<div class="wrapper-window-ctrl">
			<Button
				class="grey darken-4"
				style="align-self: flex-start;"
				depressed
				flat
				tile
				on:click="{window.previous}"
				disabled="{currentWindow < 1}"
			>
				<Icon path="{mdiArrowLeft}" />
			</Button>
			<Button
				class="grey darken-4"
				style="align-self: flex-end;"
				depressed
				flat
				tile
				on:click="{(e) => nextItem()}"
				disabled="{currentWindow === windows.length - 1}"
			>
				<Icon path="{mdiArrowRight}" />
			</Button>
		</div>
	{/if}
</div>

<style>
	div.register-form {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}

	div.wrapper-window {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	div.wrapper-window-title {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 16px 0 16px 0;
		width: 300px;
	}

	div.wrapper-window-ctrl {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 16px 0 16px 0;
	}

	div.wrapper-card {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		justify-content: center;
		padding: 16px 0 16px 0;
	}

	div.wrapper-text {
		padding: 16px 0 16px 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	div.konami-card {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		width: 225px;
		height: 150px;
		background: #272727;
		border: 3px solid #323232;
		border-radius: 1em;
		overflow: hidden;
	}

	@media (min-width: 480px) {
		div.konami-card {
			width: 375px;
			height: 250px;
		}
	}

	div.konami-card--border {
		display: flex;
		width: 100%;
		background: #161616;
		height: 15%;
	}

	div.konami-card--content {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: stretch;
		background: center / cover no-repeat url("/media/cardCover.jpg");
		width: 100%;
		flex-grow: 1;
	}

	div.konami-card--title {
		display: flex;
		padding: 10px;
		align-items: center;
		height: 100%;
	}
</style>
