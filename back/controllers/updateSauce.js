
function updateSauce(req, res) {
    const { id } = req.params;
    const { userId, name, manufacturer, description, mainPepper, heat, file } = req.body;
    Product.findByIdAndUpdate(id, { userId, name, manufacturer, description, mainPepper, heat, file })
        .then(product => res.send({ message: product }))
        .catch(err => res.send({ message: err }))
};

module.exports = { updateSauce };