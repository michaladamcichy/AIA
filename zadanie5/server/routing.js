const Express = require('express');
const BodyParser = require('body-parser');
const ejs = require('ejs');
const pino = require('express-pino-logger')();
const Session = require('express-session');
const CookieParser = require('cookie-parser');

const Mysql = require('mysql');

const connection = Mysql.createConnection({
    host: 'localhost',
    user: 'chicken',
    password: 'chicken',
    database: 'chicken',
});

connection.connect(error => {
    if (error) (error);
    else ('connected');
});

function getProducts() {
    return new Promise((resolve, reject) => {
        connection.query('select * from aia', (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

function updateProducts(sql, values) {
    return new Promise((resolve, reject) => {
        connection.query(sql, values, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

const router = Express.Router();

router.all('/', (request, response) => {
    ('default');
});

router.get('/products', (request, response) => {
    const status = request.query.status ? request.query.status : '';
    (status);
    (request.query);
    getProducts().then(products => {
        ejs.renderFile('templates/products.ejs', { products, status }, {}, (error, html) => {
            if (!error) {
                response.send(html);
            }
        });
    }).catch(error => {
        (error);
        ejs.renderFile('templates/products.ejs', { products: [] }, {}, (error, html) => {
            if (!error) {
                response.send(html);
            }
        });
    });
});

router.get('/cart', (request, response) => {
    ('cart');
    const products = request.session.cart ? request.session.cart : [];
    const status = request.query.status ? request.query.status : '';
    (status);
    ejs.renderFile('templates/cart.ejs', { products, status }, {}, (error, html) => {
        if (!error) {
            response.send(html);
        } else {
            (error);
        }
    });
});

router.post('/addToCart/:id', (request, response) => {
    ('POST');
    (request.params.id);

    if (!request.session.cart) {
        request.session.cart = [];
    }
    (request.body);

    let product;
    if (product = request.session.cart.find(element => element.id == request.params.id)) {
        product.count++;
    } else {
        request.session.cart.push({ id: request.params.id, name: request.body.name, count: 1 });
    }

    (request.session.cart);

    response.setHeader('Content-Type', 'routerlication/json');
    response.write(JSON.stringify({ status: 'added successfully' }));
    response.end();
});

router.post('/removeFromCart/:id', (request, response) => {
    ('POST');
    (request.params.id);

    if (!request.session.cart) {
        request.session.cart = [];
    }
    (request.body);

    let product;
    let status;
    if (product = request.session.cart.find(element => element.id == request.params.id)) {
        request.session.cart = request.session.cart.filter(element => element.id != request.params.id);
        status = 'removed successfully';
    } else {
        status = 'remove error - product is no longer in the cart';
    }

    (request.session.cart);

    response.setHeader('Content-Type', 'routerlication/json');
    response.write(JSON.stringify({ status }));
    response.end();
});

router.post('/purchase', (request, response) => {
    const cart = request.session.cart;

    let sql = 'UPDATE aia\nSET count = (CASE id\n';
    let indexes = '';
    let status = 'ok';
    let values = [];
    let indexesValues = [];
    cart.forEach(element => {
        sql += `WHEN ? THEN count - ?\n`;
        indexes += '?,';
        values.push(element.id);
        values.push(element.count);
        indexesValues.push(element.id);
    });
    indexes = indexes.substring(0, indexes.length - 1);
    sql += `END)\nWHERE id in (${indexes});`;

    (sql);
    (values);
    (indexesValues);
    values = values.concat(indexesValues);
    (values);
    updateProducts(sql, values).then(result => {
        (result);
        request.session.cart = [];

        if (result.affectedRows > 0) {
            ('affected');
            response.redirect('/products?status=' + encodeURIComponent('success'));
        } else {
            response.redirect('/cart?status=' + encodeURIComponent('error'));
        }
    }).catch(error => {
        (error);
        response.redirect('/cart?status=' + encodeURIComponent('error'));
    });
});

module.exports = router;