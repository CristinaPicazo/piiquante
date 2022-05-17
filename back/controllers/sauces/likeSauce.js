const { Product } = require('../../models/Product.js');
const { getSauces } = require("./getSauces");
const { sendClientResponse } = require("./getSauceById");

function likeSauce(req, res) {
    const { like, userId } = req.body;
    console.log('like:', like)
    console.log('userId:', userId)
    const product = Product.findById(req.params.id)
    console.log('product:', product)

    if (like == 1) {
        product.findByIdAndUpdate(userId, { $push: { likes: 1 } }, { new: true })
        // product.likes += 1;
        product.usersLiked.push(userId);
    }
    if (like == 0) {
        product.findByIdAndUpdate(userId, { $push: { likes: 0 } }, { new: true })

        // product.likes -= 1;
        product.usersLiked.pop(userId);
    }
    if (like == -1) {
        product.findByIdAndUpdate(userId, { $push: { likes: -1 } }, { new: true })

        // product.dislikes += 1;
        product.usersDisliked.push(userId);
    }
    product
        .save()
        .then((message) => {
            res.status(201).send({ message: message });
            console.log("Sauce updated: ", message);
        })
        .catch(err => res.status(500).send(err))

}


function updateVote(product, like, userId, res) {
    if (like == 1) {
        product.likes += 1;
        product.usersLiked.push(userId);
    }
    if (like == 0) {
        product.likes -= 1;
        product.usersLiked.pop(userId);
    }
    if (like == -1) {
        product.dislikes += 1;
        product.usersDisliked.push(userId);
    }
    product
        .save()
        .then((message) => {
            res.status(201).send({ message: message });
            console.log("Sauce updated: ", message);
        })
        .catch(err => res.status(500).send(err))
}
/*
if(![1,-1,0].includes(like)) {
    return res.status(403).send({message: "Invalid like"});
}

getSauces(req,res)
.then((product) => updateVote(product, like, userId, res))
    .then((pr) => pr.save())
    .then((prod) => sendClientResponse(prod, res))
    .then((err) => res.status(500).send(err))
}

function updateVote(product, like, userId, res) {
if(like === 1 || like === -1) {
    return incrementVote(product, like, userId);
}
return resetVote(product, userId, res);
}

function resetVote(product, userId, res) {
const {usersLiked, usersDisliked} = product;
if([usersLiked, usersDisliked].every((arr) => arr.includes(userId))) {
    return Promise.reject("User already voted");
}
if(![usersLiked, usersDisliked].some((arr) => arr.includes(userId))) {
    return Promise.reject("User already voted");
}
const votesToUpdate = usersLiked.includes(userId) ? product.likes : product.dislikes;
votesToUpdate--
usersLiked.includes(userId) ? product.likes = votesToUpdate : product.dislikes = votesToUpdate;

let arrayToUpdate = usersLiked.includes(userId) ? usersLiked : usersDisliked;
const arrayWithoutUser = arrayToUpdate.filter((id) => id !== userId);
arrayToUpdate = arrayWithoutUser
return product;
}

function incrementVote(product, like, userId) {
const {usersLiked, usersDisliked} = product;
 
const votesArray = like === 1 ? usersLiked : usersDisliked;
if(votesArray.includes(userId)) return
votesArray.push(userId);

let voteToUpdate
if (like === 1) {
    voteToUpdate = product.likes
    product.likes = ++voteToUpdate
} else {
    voteToUpdate = product.dislikes
    product.dislikes = ++voteToUpdate
}
return product

}





if(like == 1){
    Product.findByIdAndUpdate(userId, {$push: {likes: 1}}, {new: true})
    .then(() => {
        res.status(200).json({
            message: 'Sauce liked'
        })
    })
    .catch(err => {
        res.status(400).json({
            message: 'Error liking sauce',
            error: err
        })
    })
}
if(like == 0){
    Product.findByIdAndUpdate(userId, {$push: {likes: -1}}, {new: true})
    .then(() => {
        res.status(200).json({
            message: 'Sauce like cancelled'
        })
    })
    .catch(err => {
        res.status(400).json({
            message: 'Error cancelling like',
            error: err
        })
    })
}
if(like == -1){
    Product.findByIdAndUpdate(userId, {$push: {likes: -1}}, {new: true})
    .then(() => {
        res.status(200).json({
            message: 'Sauce disliked'
        })
    })
    .catch(err => {
        res.status(400).json({
            message: 'Error disliking sauce',
            error: err
        })
    })
}
*/

module.exports = { likeSauce };