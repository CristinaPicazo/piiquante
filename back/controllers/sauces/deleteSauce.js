const { Product } = require('../../models/Product.js');
const fs = require('fs');
const unlink = fs.promises.unlink;

function deleteSauce(req, res) {
    try {
        const id = req.params.id;
        Product.findByIdAndDelete(id)
            .then((item) => deleleteImage(item))
            .then((response) => res.send({ message: "File deleted", response }))
            .catch((err) => {
                console.log('err:', err)
                return res.status(500).send({ message: err });
            });
    } catch (err) {
        console.log('err:', err)
        res.status(500).send({ message: "Internal error", err })
    }
}

function deleleteImage(item) {
    try {
        const fileName = item.imageUrl.split('/').at(-1);
        return unlink(`./images/${fileName}`)
    } catch (err) {
        console.log('err:', err)
        res.status(500).send({ message: "Internal error", err })
    }
}





module.exports = { deleteSauce, deleleteImage };