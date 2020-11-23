import { delApi, postApi, API_AUTH } from 'api';

export async function post(req, res, next) {
	const { email, passwd } = req.body;
	res.setHeader('Content-Type', 'application/json');
	res.statusCode = 200;
	postApi(API_AUTH, '/users/auth', undefined, `Basic ${Buffer.from(`${email}:${passwd}`).toString('base64')}`).then((data) => {
		req.session.user = data.token;
		res.end(JSON.stringify({
			success: true,
			token: data.token
		}));
	}).catch((err) => {
		res.end(JSON.stringify(err));
	});
}

export async function del(req, res, next) {
	res.setHeader('Content-Type', 'application/json');
	res.statusCode = 200;
	delApi(API_AUTH, `/tokens/revoke`, `Bearer ${req.session.user}`).then((data) => {
		req.session.user = undefined;
		res.end(JSON.stringify({
			success: true,
			user: req.session.user
		}));
	}).catch((err) => {
		res.end(JSON.stringify(err));
	});
}