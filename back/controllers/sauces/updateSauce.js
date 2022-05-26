const { Product } = require('../../models/Product.js');
// const { sendClientResponse } = require("./getSauceById");
const { userRouter } = require('../../routes/userRouter.js');
const { User } = require('../../models/User.js');
const { makeImageUrl } = require('./createSauce');
const fs = require('fs');
const { deleleteImage } = require('./deleteSauce');

function updateSauce(req, res) {
    const { sauce, img } = req.body;
    console.log('req.body:', req.body)
    console.log('params:', req.params)

    // const {hasNewImage
    //     params: { id }
    // } = req;
    const id = req.params.id;
    console.log('req.params.imageUrl:', req.params.imageUrl)
    console.log('req.file:', req.file)
    const hasNewImage = req.file != null
    console.log('hasNewImage:', hasNewImage)
    // const payload = makePayload(hasNewImage, req);

    Product.findByIdAndUpdate(id, req.body, (error, data) => {
        if (error) {
            return res.status(500).send(error);
        }
        if (data == null) {
            return res.status(404).send({ message: "Sauce not found" });
        }
        if (id == data._id) {
            if (!req.file) {
                return res.status(200).send(data);
            } else {
                deleleteImage(hasNewImage)
                makeImageUrl(req, hasNewImage)                
                    return res.status(200).send(data);
            }
        }
        // if(req.file.filename == data.imageUrl){
        //     deleteImage(req.file.filename);
        //         data.imageUrl = makeImageUrl(req, req.file.filename);
        //     return res.status(200).send(data);
        // } else {
        //     return res.send({ message: "User doesn't own this sauce" });
        // }

    });
}

function makePayload(hasNewImage, req) {
    const payload = JSON.parse(req.body.sauce)
    if (!hasNewImage) return req.body;
    payload.imageUrl = makeImageUrl(req, hasNewImage);
    return payload;
    
}


function deleteImage(product) {
    console.log('product:', product)
    if (product == null) return
    console.log('imageToDelete:', imageToDelete)
    const imageToDelete = product.split('/').at(-1);
    console.log('imageToDelete splited:', imageToDelete)
    return unlink(`images/${imageToDelete}`);
}

module.exports = { updateSauce };