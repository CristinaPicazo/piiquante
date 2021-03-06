const { Product } = require('../../models/Product.js');

function makeImageUrl(req, fileName) {
    return req.protocol + "://" + req.get("host") + "/images/" + fileName;
}

function createSauce(req, res) {
    try {
        const { body, file } = req;
        if (!file) {
            return res.status(400).send({ message: "Image is required" });
        }
        const { fileName } = file;
        const sauce = JSON.parse(body.sauce);

        const { userId, name, manufacturer, description, mainPepper, heat } = sauce;

        const newProduct = new Product({
            userId,
            name,
            manufacturer,
            description,
            mainPepper,
            imageUrl: makeImageUrl(req, file.fileName),
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
    catch (err) {
        console.error(err)
        return res.status(500).send(err);
    }
}
module.exports = { createSauce, makeImageUrl };