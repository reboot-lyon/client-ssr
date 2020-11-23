import { getApi,  API_AUTH } from 'api'

export function post(req, res, next) {
	const { yugiohid, email } = req.body;
	res.statusCode = 200;
	res.setHeader('Content-Type', 'application/json');
	getApi(API_AUTH, `/users?text=${yugiohid ? `${yugiohid}` : email ? `${email}` : ''} }`).then((data) => {
		if (data.length != 0) {
			res.end(JSON.stringify({ success: false }));
		} else {
			res.end(JSON.stringify({ success: true }));
		}
	}).catch((err) => {
		res.end(JSON.stringify(err));
	});
}