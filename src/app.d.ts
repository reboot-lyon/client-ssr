/// <reference types="@sveltejs/kit" />

interface ImportMetaEnv {
	VITE_API_AUTH_PATH: string;
	VITE_API_YUGIOH_PATH: string;
}

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	interface Locals {
		userid: string;
		sessionid: string;
	}

	// interface Platform {}

	interface Session {
		jwt: string;
	}

	// interface Stuff {}
}
