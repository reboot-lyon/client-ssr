import sirv from 'sirv';
import polka from 'polka';
import helmet from 'helmet';
import { v4 as uuidv4 } from 'uuid';
import compression from 'compression';
import * as sapper from '@sapper/server';
import bodyParser from 'body-parser';
import session from 'express-session';
import sessionFileStore from 'session-file-store';

const { PORT, NODE_ENV, SECRET } = process.env;
const dev = NODE_ENV === 'development';

const fileStore = sessionFileStore(session);

polka()
	.use(
		helmet({
			contentSecurityPolicy: false
		}),
		bodyParser.json(),
		bodyParser.urlencoded({
			extended: true
		}),
		session({
			secret: SECRET || 'abcd',
			resave: false,
			saveUninitialized: true,
			cookie: {
				maxAge: 31536000,
				sameSite: true,
				secure: false
			},
			store: new fileStore({
				path: process.env.NOW ? `/tmp/sessions` : `.sessions`
			})
		}),
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware({
			session: req => ({
				user: req.session && req.session.user
			})
		})
	)
	.listen(PORT, () => {
		console.log(`:: ${PORT}`);
	});
