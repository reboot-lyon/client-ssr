export const api = async (method: string, url: string, data?: Record<string, any>) => {
	try {
		const res = await fetch(url, {
			method,
			headers: {
				"content-type": "application/json",
				accept: "application/json"
			},
			body: data && JSON.stringify(data)
		});

		return res.body;
	} catch (e) {
		return e;
	}
};

function fetchProxy(method: string, endpoint: string, data?: Record<string, unknown>) {
	const opts: {
		method: string;
		headers: Record<string, any>;
		body?: string;
	} = { method, headers: {} };
	if (data) {
		opts.headers["Accept"] = "application/json";
		opts.headers["Content-Type"] = "application/json";
		opts.body = JSON.stringify(data);
	}
	return fetch(endpoint, opts);
}

export function getProxy(endpoint: string) {
	return fetchProxy("GET", endpoint);
}

export function postProxy(endpoint: string, data: Record<string, unknown>) {
	return fetchProxy("POST", endpoint, data);
}

export function putProxy(endpoint: string, data: Record<string, unknown>) {
	return fetchProxy("PUT", endpoint, data);
}

export function delProxy(endpoint: string) {
	return fetchProxy("DELETE", endpoint);
}

/*export const api = async (req: Request<Locals>, resource: string, data?: Record<string, any>) => {
	if (!req.locals.userid) return { status: 401 };

	console.log(`${req.method} ${base}/${resource}`);

	try {
		const res = await fetch(`${base}/${resource}`, {
			method: req.method,
			headers: {
				"content-type": "application/json"
			},
			body: data && JSON.stringify(data)
		});

		const json = req.method !== "DELETE" ? await res.json() : {};

		return {
			status: res.status,
			body: JSON.stringify(json)
		};
	} catch (e) {
		return {
			status: 523,
			body: JSON.stringify({
				error: {
					name: "Unreachable Resource",
					message: "Unreachable origin",
					status: 523
				}
			})
		};
	}
};*/
