import { API_AUTH_PATH } from "$env";

const base = `http://${API_AUTH_PATH}`;

export function api(
	method: string,
	resource: string,
	data?: Record<string, unknown>,
	headers?: Record<string, unknown>
): Promise<Response> {
	return fetch(`${base}/${resource}`, {
		method,
		headers: {
			"content-type": "application/json",
			...headers
		},
		body: data && JSON.stringify(data)
	});
}
