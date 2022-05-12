const { Product } = require('../../models/Product.js');
const { getSauces } = require("./getSauces");
const { sendClientResponse } = require("./getSauceById");

function likeSauce(req, res) {
    const {like, userId} = req.body;
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

module.exports = {likeSauce};