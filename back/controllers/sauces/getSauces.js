const { Product } = require('../../models/Product.js');

function getSauces(req, res) {
    try {
        Product.find({})
            .then((products) => res.status(200).send(products))
            .catch((err) => res.status(500).send(err));
    } catch (err) {
        console.error(err)
        res.status(500).send({ message: "Internal error", err })
    }
}

module.exports = { getSauces };
