const { Product } = require('../models/Product.js');



function createSauce(req, res) {
    const name = req.body.name;
    const manufacturer = req.body.manufacturer;
    // res.send(req.body);
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

module.exports = { createSauce };