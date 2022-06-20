const { Product } = require('../../models/Product.js');

function likeSauce(req, res) {
    try {
        const { like, userId } = req.body;
        const id = req.params.id;
        const product = Product.findById(id)
            .then(product => checkUsersLiked(product, userId, like))
            .then(product => dbSaveLikesDislikes(req, res, product))
            .catch(err => res.status(500).send(err))
    } catch (err) {
        console.error(err)
        res.status(500).send({ message: "Internal error", err })
    }
}

function checkUsersLiked(product, userId, like) {
    try {
        const usersLiked = product.usersLiked;
        const usersDisliked = product.usersDisliked;

        if (like == 1) {
            product.likes++;
            if ((usersLiked.indexOf(userId) > -1)) {
                return message = "You already liked this sauce"
            }
            usersLiked.push(userId);
        }

        if (like == -1) {
            product.dislikes++;
            if (usersDisliked.indexOf(userId) > -1) {
                return message = "You already disliked this sauce"
            }
            usersDisliked.push(userId);


        }
        if (like == 0) {
            if (usersLiked.indexOf(userId) > -1) {
                product.likes--;
                deleteUserLikes(usersLiked, userId)
            }
            if (usersDisliked.indexOf(userId) > -1) {
                product.dislikes--;
                deleteUserLikes(usersDisliked, userId)
            }
        }
        return product;
    } catch (err) {
        console.error(err)
        res.status(500).send({ message: "Internal error", err })
    }
}

function deleteUserLikes(usersLikes, userId) {
    try {
        for (var i = 0; i <= usersLikes.length; i++) {
            if (usersLikes[i] == userId) {
                usersLikes.splice(i, 1)
            }
        }
        return usersLikes;
    } catch (err) {
        console.error(err)
        res.status(500).send({ message: "Internal error", err })
    }
}

// Send likes or dislikes to db
function dbSaveLikesDislikes(req, res, product) {
    try {
        if (!product) return;
        product.save().then(product => res.status(200).send({ product }))
            .catch(err => res.status(500).send(err))
    } catch (err) {
        console.error(err)
        res.status(500).send({ message: "Internal error", err })
    }
}

module.exports = { likeSauce };