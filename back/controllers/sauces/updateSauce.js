const { Product } = require('../../models/Product.js');
// const { sendClientResponse } = require("./getSauceById");
// const { userRouter } = require('../../routes/userRouter.js');
// const { User } = require('../../models/User.js');
// const { makeImageUrl } = require('./createSauce');
const { deleleteImage } = require('./deleteSauce');

async function updateSauce(req, res) {
    try {
        // const { sauce, img } = req.body;
        const id = req.params.id;

        Product.findByIdAndUpdate(id, function (error, data) {
            console.log('data:', data)
            if (error) {
                return res.status(500).send(error);
            }
            if (data == null) {
                return res.status(404).send({ message: "Sauce not found" });
            }

            // const payLoad = hasNewImage ? { ...req.body, imageUrl: req.file.path } : req.body;
            console.log('data1:', data)
            hasNewImage(req, data)
            return res.status(200).send({ message: "Sauce updated" });
            /*
            if (!hasNewImage) {
                return res.status(200).send(data);
            } else {
                deleleteImage(hasNewImage)
                makeImageUrl(req, hasNewImage)
                return res.status(200).send(data);
            }      
            */

        });
    } catch (error) {
        console.log('error:', error)
        return res.status(500).send(error);
    }
}

function hasNewImage(req, data) {
    console.log('data:', data)
    console.log('hasNewImage:', hasNewImage)
    const hasNewImage = req.file != null
    if (hasNewImage) {
        deleleteImage(data)
        console.log('req.body:', req.body)
        console.log('req.imageUrl:', req.imageUrl)
        console.log('req.file.path:', req.file.path)
        req.imageUrl = req.file.path
        console.log('req.imageUrl:', req.imageUrl)
        return req.body, req.imageUrl
    }
}



module.exports = { updateSauce }
