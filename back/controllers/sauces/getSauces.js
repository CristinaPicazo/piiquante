const { Product } = require('../../models/Product.js');

function getSauces(req, res) {
    Product.find({})
    .then((products) => res.status(200).send(products))
    .catch((err) => res.status(500).send(err));
}

module.exports = { getSauces };
