const { Product } = require('../../../models/Product');

async function isUserTheOwner(req) {
    const userId = req.userId;
    const productId = req.params.id;

    const productFromDB = await Product.findById(productId)
    return (userId == productFromDB.userId)
}

module.exports = { isUserTheOwner };