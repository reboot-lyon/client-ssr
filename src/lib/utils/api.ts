function fetchProxy(method: string, endpoint: string, data?: Record<string, unknown>) {
	return fetch(endpoint, {
		method,
		headers: {
			"content-type": "application/json",
			accept: "application/json"
		},
		body: data && JSON.stringify(data)
	});
}

export function getProxy(endpoint: string): Promise<Response> {
	return fetchProxy("GET", endpoint);
}

export function postProxy(endpoint: string, data: Record<string, unknown>): Promise<Response> {
	return fetchProxy("POST", endpoint, data);
}

export function putProxy(endpoint: string, data: Record<string, unknown>): Promise<Response> {
	return fetchProxy("PUT", endpoint, data);
}

export function delProxy(endpoint: string): Promise<Response> {
	return fetchProxy("DELETE", endpoint);
}
