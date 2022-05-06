import type { RequestHandler } from "@sveltejs/kit";

/*
export const post: RequestHandler = async (req: Request<Locals>) => {
	const { yugiohid, firstname, lastname, email, passwd } = req.body;
	res.setHeader("Content-Type", "application/json");
	res.statusCode = 200;
	postApi(API_AUTH, "/users", {
		yugiohid: yugiohid,
		firstname: firstname,
		lastname: lastname,
		email: email,
		passwd: passwd
	})
		.then((data) => {
			console.log("data", data);
			res.end(
				JSON.stringify({
					success: true,
					id: data.id
				})
			);
		})
		.catch((err) => {
			console.log("err", err);
			return res.end(JSON.stringify(err));
		});
};
*/

import { api } from "../_api";

export const get: RequestHandler = async ({ request, locals, url }) => {
	const konamiid = url.searchParams.get("konamiid");
	const email = url.searchParams.get("email");

	const path = "users";

	if (email) path.concat(`?email=${email}`);
	else if (konamiid) path.concat(`?konamiid=${konamiid}`);

	if (!email && !konamiid) return {};

	const res = await api("GET", path);

	return {};
};
