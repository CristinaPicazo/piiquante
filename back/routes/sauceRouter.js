const express = require("express");
const { getSauces, getSauceById, createSauce, deleteSauce, updateSauce, likeSauce } = require("../controllers/sauces/index.js");
const sauceRouter = express.Router();

// Middleware
const { checkToken } = require("../middleware/checkToken");
const { upload } = require("../middleware/multer");

sauceRouter.use(checkToken);
// Routes
sauceRouter.get('/', getSauces);
sauceRouter.get('/:id', getSauceById);
sauceRouter.post('/', upload.single("image"), createSauce);
sauceRouter.put('/:id', updateSauce);
sauceRouter.delete('/:id', deleteSauce);
sauceRouter.post('/:id/like', likeSauce);

module.exports = { sauceRouter }