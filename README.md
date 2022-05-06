# Reboot WebApp client-ssr

A Yugiho web application to manage leagues and Yugiho tournaments, register user to matchs and draw season leadboards.

## Features

- Handle USER Login / Logout and Register Account with Yugiho ID
- Store official Yugioh tournaments file to create season leagues
- Display player stats and carrier profile

## Developing

Once you've clone this project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

Before creating a production version of your app, install an [adapter](https://kit.svelte.dev/docs#adapters) for your target environment. Then:

```bash
npm run build
```

> You can preview the built app with `npm run preview`, regardless of whether you installed an adapter. This should _not_ be used to serve your app in production.

## Dependecies

| Library       | Description | Link                                                    |
| ------------- | ----------- | ------------------------------------------------------- |
| @mdi/js       | SVG Icons   | [MaterialDesignIcons](https://materialdesignicons.com/) |
| @sveltejs/kit | SSR WebApp  | [SvelteKit](https://kit.svelte.dev/)                    |
| @sveltejs     | Framwork    | [Svelte](https://svelte.dev/)                           |
