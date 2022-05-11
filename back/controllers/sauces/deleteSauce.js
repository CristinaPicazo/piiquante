const { Product } = require('../../models/Product.js');
const unlink = require('fs').promises.unlink;
// const payload = makePayload(hasNewImage,req);

function deleteSauce(req, res) {
    if (product == null) return
    console.log("Image deleted: ", product);
    const imageToDelete = product.imageUrl.split('/').at(-1);
    return unlink("images/" + imageToDelete)
}

function makePayload(hasNewImage, req) {
    if (!hasNewImage) return req.body;
    const payload = JSON.parse(req.body.sauce)
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



module.exports = { deleteSauce };