const { Product } = require('../../models/Product.js');
// const { getSauces } = require("./getSauces");
const { getSauceById } = require("./getSauceById");

function likeSauce(req, res) {
    const { like, userId } = req.body;
    console.log('userId:', userId)
    console.log('like:', like)
    const productId = req.params.id;
    const product = Product.findById(req.params.id)
    checkUsersLiked(product, productId, userId, like);
    
    // Product.findByIdAndUpdate(id, req.body, (error, data) => {
    // }
}

function checkUsersLiked(product, productId, userId, like) {//product
    switch (like) {
        case 1:
    
            product.findByIdAndUpdate(productId, { likes: like }, { $push: { usersLiked: userId } }, { new: true })
            if (product.usersLiked.find(userId)) {
                return message = "You already liked this sauce";
            }
            product.insertOne({ likes: like }, { $push: { usersLiked: userId } } )
            break;
        case -1:
            if (product.usersDisliked.includes(userId)) {
                return message = "You already disliked this sauce";
            }

            product.insertOne({ dislikes: like }, { $push: { usersDisliked: userId } })
            break;
        case 0:
            if ((product.usersLiked.includes(userId)) || (product.usersDisliked.includes(userId))) {
                return message = "User removed from liked or dislike sauces";
            }
            product.updateOne({ likes: like }, { dislikes: like }, { $pop: { usersLiked: userId }, $pop: { usersDisliked: userId } })
            break;
    }

}

module.exports = { likeSauce };