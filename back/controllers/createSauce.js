const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    userId: String,
    name: String,
    manufacturer: String,
    description: String,
    mainPepper: String,
    imageUrl: String,
    heat: Number,
    likes: Number,
    dislikes: Number,
    usersLiked: [String],
    usersDisliked: [String],
})
const Product = mongoose.model('Product', productSchema);

function createSauce(req, res) {
    // const sauce: String,
    // const image: File,
    const product = new Product({
        userId: 'chocolate',
        name: 'chocolate',
        manufacturer: 'chocolate',
        description: 'chocolate',
        mainPepper: 'chocolate',
        imageUrl: 'chocolate',
        heat: 2,
        likes: 2,
        dislikes: 2,
        usersLiked: ['milka'],
        usersDisliked: ['milka'],
    })
    product.save()
        .then((res) => console.log('sauce created', res))
        .catch((err) => console.log('error', err))
}

module.exports = { createSauce, Product, productSchema };