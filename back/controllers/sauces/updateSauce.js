const { sendClientResponse } = require("./getSauceById");

function updateSauce(req, res) {
    const { 
        params: {id }
    } = req;

    const hasNewImage = req.file != null
    const payload = makePayload(hasNewImage, req);

    Product.findByIdAndUpdate(id, payload)
    .then((dbResponse) => sendClientResponse(dbResponse,res))
        .then((product => deleteImage(product)))
        .then((res) => res.send({ message: "File deleted", res }))
        .catch(err => res.send({ message: err }))
};

function deleteImage(product) {
    const imageUrl = product.imageUrl;
    const filetoDelete = imageUrl.split('/').at(-1);
    return unlink(`images/${filetoDelete}`).then(() => product);
}

module.exports = { updateSauce };