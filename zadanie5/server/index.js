const Express = require('express');
const BodyParser = require('body-parser');
const ejs = require('ejs');
const pino = require('express-pino-logger')();
const Session = require('express-session');
const CookieParser = require('cookie-parser');

const app = Express();
app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());
app.use(pino);
app.use(CookieParser());
app.use(Session({ secret: 'secret' }));

const routing = require('./routing');
app.use('/', routing);

app.listen(3001, () =>
    ('Express server is running on localhost:3001')
);