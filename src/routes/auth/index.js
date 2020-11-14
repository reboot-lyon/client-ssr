//import { postApi } from '../../node_modules/api';

export async function post(req, res, next) {
	const { email, passwd } = req.body;
	res.setHeader('Content-Type', 'application/json');
	if (email === 'lacueil@gmail.com' && passwd === 'secret') {
		req.session.user = true;
		setTimeout(() => {res.end(JSON.stringify({
			user: req.session.user
		}));}, 2000);
	} else {
		res.statusCode = 200;
		res.end(JSON.stringify({
			error: {
				name: 'Login',
				message: 'Invalid credentials',
				status: 200,
			}
		}));
	}
}

export async function del(req, res, next) {
	const user = false;
	req.session.user = user;
	res.end(JSON.stringify({
		user: user
	}));
}