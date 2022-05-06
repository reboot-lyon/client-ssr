import type { RequestHandler } from "@sveltejs/kit";
import { api } from "../_api";

export const post: RequestHandler = async ({ request, locals }) => {
	const form = await request.formData();

	const username = form.get("username");
	const password = form.get("password");

	const res = await api("POST", "users/auth", {
		username,
		password
	});

	if (res.ok) {
		const { token } = await res.json();
		locals.sessionid = token;
	}

	return {
		status: res.status
	};
};

export const del: RequestHandler = async ({ locals }) => {
	const sessionid = locals.sessionid;

	const res = await api("DELETE", "tokens", undefined, {
		authorization: `Bearer ${sessionid}`
	});

	if (res.ok) locals.sessionid = "";

	return {
		status: res.status
	};
};
