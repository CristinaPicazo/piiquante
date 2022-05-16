const { Product } = require('../../models/Product.js');


function getSauceById(req, res) {
    getSauces(req, res)
        .then((product) => sendClientResponse(product, res))
        .catch(err => res.status(500).send(err))
}

function getSauces(req, res) {
    const { id } = req.params;
    return Product.findById(id)
}

function sendClientResponse(product, res) {
    if (product == null) {
        return res.status(404).send({ message: "Sauce not found" });
    }
    return res.status(200).send(product)
    // return Promise.resolve(res.status(200).send(product).then(() => product));
}


module.exports = { getSauceById, sendClientResponse };