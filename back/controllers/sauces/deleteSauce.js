const { Product } = require('../../models/Product.js');
const unlink = require('fs').promises.unlink;

function deleteSauce(req, res) {
    const { id } = req.params;
    Product.findByIdAndDelete(id)
        .then(deleteImage)
        .then((product) => {
            res.send({ message: product })
        })
        .catch(err => res.send({ message: err }))
}

function deleteImage(product) {
    const imageUrl = product.imageUrl;
    const filetoDelete = imageUrl.split('/').at(-1);
    return unlink(`images/${filetoDelete}`).then(() => product);
}

module.exports = { deleteSauce };