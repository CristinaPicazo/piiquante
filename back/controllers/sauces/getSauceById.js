const { Product } = require('../../models/Product.js');


function getSauceById(req, res) {
    try {
        getSaucesById(req, res)
            .then((product) => sendClientResponse(product, res))
            .catch(err => res.status(500).send(err))
    } catch (err) {
        console.error(err)
        res.status(500).send({ message: "Internal error", err })
    }
}

function getSaucesById(req, res) {
    try {
        const { id } = req.params;
        return Product.findById(id)
    } catch (err) {
        console.error(err)
        res.status(500).send({ message: "Internal error", err })
    }
}

function sendClientResponse(product, res) {
    try {
        if (product == null) {
            return res.status(404).send({ message: "Sauce not found" });
        }
        return res.status(200).send(product)
    } catch (err) {
        console.error(err)
        res.status(500).send({ message: "Internal error", err })
    }
}


module.exports = { getSauceById, sendClientResponse };