const { Product } = require('../../models/Product.js');

function makeImageUrl(req, fileName) {
    return req.protocol + "://" + req.get("host") + "/images/" + fileName;
}

function createSauce(req, res) {
    const { body, file } = req;
    const { fileName } = file;
    const sauce = JSON.parse(body.sauce);
    const { userId, name, manufacturer, description, mainPepper, heat } = sauce;

    const newProduct = new Product({
        userId,
        name,
        manufacturer,
        description,
        mainPepper,
        imageUrl: makeImageUrl(req, fileName),
        heat,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
    });
    newProduct
        .save()
        .then((message) => {
            res.status(201).send({ message: message });
            console.log("Sauce created: ", message);
        })
        .catch(err => res.status(500).send(err))
}
module.exports = { createSauce };