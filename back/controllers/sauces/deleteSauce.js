const { Product } = require('../../models/Product.js');
const { sendClientResponse } = require('./getSauceById.js');
const unlink = require('fs').promises.unlink;
// const payload = makePayload(hasNewImage,req);

function deleteSauce(req, res) {
    console.log('product:', product)
    Product.findByIdAndDelete(id)
    .then((res) => res.send({ message: "File deleted", res }))
        .then((product) => sendClientResponse(product, res))
        // .then((item) => deleleteImage(item))
        .catch((err) => res.status(500).send({ message: err }));

}

function makePayload(hasNewImage, req) {
    const payload = JSON.parse(req.body.sauce)
    if (!hasNewImage) return req.body;
    payload.imageUrl = makeImageUrl(req, req.file.fileName);
    return payload;
}

/*
    const { id } = req.params;
    Product.findByIdAndDelete(id)
        .then(deleteImage)
        .then((product) => {
            res.send({ message: product })
        })
        .catch(err => res.send({ message: err }))
}
*/



module.exports = { deleteSauce, makePayload };