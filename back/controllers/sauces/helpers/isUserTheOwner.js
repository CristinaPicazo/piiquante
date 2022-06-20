const { Product } = require('../../../models/Product');

async function isUserTheOwner(req) {
    try{
    const userId = req.userId;
    const productId = req.params.id;

    const productFromDB = await Product.findById(productId)
    return (userId == productFromDB.userId)
    } catch (err) {
        console.error(err)
        return false;
    }
}

module.exports = { isUserTheOwner };