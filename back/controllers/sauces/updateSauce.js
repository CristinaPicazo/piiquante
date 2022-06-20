const { Product } = require('../../models/Product');
const { sendClientResponse } = require("./getSauceById");
const { makeImageUrl } = require('./createSauce');
const { deleleteImage } = require('./deleteSauce');
const { isUserTheOwner } = require('./helpers/isUserTheOwner');


async function updateSauce(req, res) {
    try {
        const sauce = getSauceFromBody(req)
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

    } catch (err) {
        console.error(err)
        return res.status(500).send(err);
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
    } catch (err) {
        console.error(err)
        return res.status(500).send(err);
    }
}

function deletePreviousImage(Product, id) {
    try {
        Product.findById(id, function (err, item) {
            deleleteImage(item)
        })
    } catch (err) {
        console.error(err)
        return res.status(500).send(err);
    }
}

// Add new picture to the sauce
function addImageUrlToSauce(req, sauce) {
    try {
        sauce.imageUrl = makeImageUrl(req, req.file.filename)
    }
    catch (err) {
        console.error(err)
        return res.status(500).send(err);
    }
}

module.exports = { updateSauce }
