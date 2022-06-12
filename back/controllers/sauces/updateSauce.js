const { Product } = require('../../models/Product');
const { sendClientResponse } = require("./getSauceById");
const { makeImageUrl } = require('./createSauce');
const { deleleteImage } = require('./deleteSauce');
const { isUserTheOwner } = require('./helpers/isUserTheOwner');


async function updateSauce(req, res) {
    try {
        const sauce = getSauceFromBody(req)
        console.log('sauce:', sauce)
        const id = req.params.id;

        const isUser = await isUserTheOwner(req)
        if (!isUser) return res.status(403).send({ message: "403: unauthorized request, you don't own this sauce" });


        if (req.file != null) {
            // Wait for the picture to be updated
            await addImageUrlToSauce(req, sauce)
            // Wait for the picture to be deleted
            await deletePreviousImage(Product, id)
        }

        const result = await Product.findByIdAndUpdate(id, sauce)
        sendClientResponse(result, res)

    } catch (error) {
        console.error(error)
        return res.status(500).send(error);
    }
}

function getSauceFromBody(req) {
    try {
        const hasNewImage = req.file != null
        let sauce;
        if (hasNewImage) {
            const stringSauce = req.body.sauce
            sauce = JSON.parse(stringSauce)
        } else {
            sauce = req.body;
        }
        return sauce;
    } catch (error) {
        console.log('error:', error)
        return res.status(500).send(error);
    }
}

function deletePreviousImage(Product, id) {
    try {
        Product.findById(id, function (err, item) {
            deleleteImage(item)
        })
    } catch (error) {
        console.log('error:', error)
        return res.status(500).send(error);
    }
}

// Add new picture to the sauce
function addImageUrlToSauce(req, sauce) {
    try {
        sauce.imageUrl = makeImageUrl(req, req.file.filename)
    }
    catch (error) {
        console.log('error:', error)
        return res.status(500).send(error);
    }
}

//Check if user own the sauce
//TO DO
// I need the user _id to check if the user owns the sauce



module.exports = { updateSauce }
