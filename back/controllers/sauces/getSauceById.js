const { Product } = require('../../models/Product.js');


function getSauceById(req, res) {
    getSauceById(req,res)
    .then((product) => sendClientResponse(product, res))
    .catch(err => res.status(500).send(err))

}

function sendClientResponse(product, res) {
    if(product == null) {
        res.status(404).send({ message: "Sauce not found" });
    }
    return Promise.resolve(res.status(200).send(product).then(() => product));

}


module.exports = { getSauceById, sendClientResponse };