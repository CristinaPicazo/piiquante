const multer = require('multer');
const upload = multer({ dest: '../uploads' });
const { Product } = require('../models/Product.js');

function createSauce(req, res) {
    upload.single('imageUrl')(req, res => {
        console.log('userId:', userId)
        console.log('name:', name)
        const { userId, name, manufacturer, description, mainPepper, imageUrl, heat, likes, dislikes, usersLiked, usersDisliked } = req.body;
        const newProduct = new Product({
            userId,
            name,
            manufacturer,
            description,
            mainPepper,
            imageUrl,
            heat,
            likes,
            dislikes,
            usersLiked: [],
            usersDisliked: [],
        });
        newProduct.save()
            .then(product => res.send(product))
            .catch(err => res.send(err))
    });


    // res.send(req.body);
    // const sauce: String,
    // const image: File,

    //     const product = new Product({
    //         userId: 'chocolate',
    //         name: 'chocolate',
    //         manufacturer: 'chocolate',
    //         description: 'chocolate',
    //         mainPepper: 'chocolate',
    //         imageUrl: 'chocolate',
    //         heat: 2,
    //         likes: 2,
    //         dislikes: 2,
    //         usersLiked: ['milka'],
    //         usersDisliked: ['milka'],
    //     })
    //     product.save()
    //         .then((res) => console.log('sauce created', res))
    //         .catch((err) => console.log('error', err))
    // }
}
module.exports = { createSauce };