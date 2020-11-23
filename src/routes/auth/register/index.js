import { postApi, API_AUTH } from 'api';

export function post(req, res, next) {
	const { yugiohid, firstname, lastname, email, passwd } = req.body;
	res.setHeader('Content-Type', 'application/json');
	res.statusCode = 200;
	postApi(API_AUTH, '/users', {
		yugiohid: yugiohid,
		firstname: firstname,
		lastname: lastname,
		email: email,
		passwd: passwd
	}).then((data) => {
		console.log('data', data);
		res.end(JSON.stringify({
			success: true,
			id: data.id
		}));
	}).catch((err) => {
		console.log('err', err);
		return (res.end(JSON.stringify(err)));
	});
}