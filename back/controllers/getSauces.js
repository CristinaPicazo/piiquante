require('dotenv').config();
const { Product, productSchema } = require('./createSauce');
const jwt = require('jsonwebtoken');

function getSauces(req, res) {
    const header = req.header('Authorization');
    if (!header) {
        res.status(401).send({ message: "You must be logged in" })
    }
    const token = header.split(' ')[1];
    if (!token) {
        res.status(401).send({ message: "No token provided" })
    }

    jwt.verify(token, process.env.JWT_PASSWORD, (err, decoded) => {
        handleTokenError(err, res, decoded);
    });
}

function handleTokenError(err, res, decoded) {
    if (err) {
        res.status(401).send({ message: "Invalid token" })
    }
    else {
        Product.find({}).then(products => res.send(products))
    }
}

module.exports = { getSauces };
