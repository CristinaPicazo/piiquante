const { Product } = require('../../models/Product.js');

function getSauceById(req, res) {
    const { id } = req.params;
    Product.findById(id)
        .then(product => res.send(product))
        .catch(err => res.send(err))
}


module.exports = { getSauceById };