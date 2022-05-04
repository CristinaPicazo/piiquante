const { Product } = require('../models/Product.js');

function getSauces(req, res) {
    Product.find({})
        .then(products => res.send(products))
        .catch(err => res.send(err))
}

module.exports = { getSauces };
