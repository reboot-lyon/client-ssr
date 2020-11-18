<script>
	import { Button, Icon, TextField, Window, WindowItem } from 'svelte-materialify/src';
	import { mdiArrowLeft, mdiArrowRight } from '@mdi/js';

	const form = {
		yugiohid: undefined,
		fistname: undefined,
		lastname: undefined,
		email: undefined,
		passwd: undefined,
		phone: undefined
	};

	const window = {
		this: undefined,
		cur: 0
	};

	const windows = [
		{
			title: 'Enter Yugioh ID',
			values: {
				yugiohid: undefined
			},
			rules: {
				yugiohid: [
					(v) => {
						const pattern = /^[0-9]*$/;
						return (pattern.test(v) || 'Numbers only.');
					}
				]
			}
		},
		{
			title: 'Who are you ?',
			values: {
				fistname: undefined,
				lastname: undefined
			},
			rules: {
				name: [
					(v) => {
						const pattern = /^[A-z]*$/;
						return (pattern.test(v) || 'Letters only.');
					}
				]
			}
		}
	];

	let error = null;

	const nextItem = (e) => {
		const buffer = windows[window.cur].values;
		console.log(buffer);
		for (let key in buffer) {
			if (buffer[key] === '') {
				error = 'Error field.'
				return;
			};
		}
		window.this.next();
	}
</script>

<div class="register-form">
	<div class="wrapper-window-title">
		<h2 class="pb-4">Register</h2>
		<br />
		<h5 class="pt-4 pb-4">{windows[window.cur].title}</h5>
	</div>
	<div class="wrapper-window">
		<Window bind:this="{window.this}" bind:value="{window.cur}" vertical continuous="{false}">
			<WindowItem>
				<div class="d-flex flex-column justify-center align-center">
					<div class="wrapper-card">
						<div class="konami-card">
							<div class="konami-card--border" style="justify-content: flex-start;">
								<div class="konami-card--title red-text text-darken-3">
									KONAMI
								</div>
							</div>
							<div class="konami-card--content red darken-3" />
							<div class="konami-card--border" style="justify-content: flex-end;">
								<div class="konami-card--title">
									{windows[0].values.yugiohid || 'Yugioh ID'}
								</div>
							</div>
						</div>
					</div>
					<div class="d-flex justify-center">
						<TextField filled clearable type="text" inputmode="tel" bind:value="{windows[0].values.yugiohid}" bind:rules="{windows[0].rules.yugiohid}" on:keypress="{(e) => e.key === 'Enter' ?  nextItem(e) : null}">
							Yugioh ID
						</TextField>
					</div>
				</div>
			</WindowItem>
			<WindowItem>
				<div class="d-flex justify-center flex-column align-center">
					<TextField filled clearable type="text" inputmode="text" bind:value="{windows[1].values.firstname}" bind:rules="{windows[1].rules.name}">
						Firstname
					</TextField>
					<TextField filled clearable type="text" inputmode="text" bind:value="{windows[1].values.lastname}" bind:rules="{windows[1].rules.name}" on:keypress="{(e) => e.key === 'Enter' ? nextItem(e) : null}">
						Lastname
					</TextField>
				</div>
			</WindowItem>
		</Window>
	</div>
	{error ? error: ''}
	<div class="wrapper-window-ctrl">
		<Button class="grey darken-4" style="align-self: flex-start;" depressed flat tile on:click="{window.this.previous}" disabled="{window.cur < 1}">
			<Icon path="{mdiArrowLeft}" />
		</Button>
		<Button class="grey darken-4" style="align-self: flex-end;" depressed flat tile on:click="{(e) => nextItem(e)}" disabled="{window.cur === windows.length - 1}">
			<Icon path="{mdiArrowRight}" />
		</Button>
	</div>
</div>

<style>
	@import 'svelte-materialify/src/styles/tools/colors';

	div.register-form {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		width: 50vw;
	}

	div.wrapper-window {
		height: 50vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	div.wrapper-window-title {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	
	div.wrapper-window-ctrl {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
	}

	div.wrapper-card {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		justify-content: center;
		padding: 0 0 32px 0;
	}

	div.konami-card {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		width: 275px;
		height: 180px;
		background: #272727;
		border: 3px solid #323232;
		border-radius: 1em;
		overflow: hidden;
	}

	div.konami-card--border {
		display: flex;
		width: 100%;
		background:#161616;
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
		padding: 1em;
		align-items: center;
		height: 100%;
	}

	@media (min-width: 480px) {

		div.konami-card {
			width: 450px;
			height: 300px;
		}
	}
</style>