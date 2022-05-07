const multer = require('multer');

const storeage = multer.diskStorage({
    destination: 'images/',
    filename: function (req, file, cb) {
        cb(null, makeFilename(req, file));
    }
});
const upload = multer({ storeage: storeage });

function makeFilename(req, file) {
    const fileName = `${Date.now()}-${file.originalname}`.replace(/\s/g, '-');
    file.fileName = fileName;
    return fileName
}

module.exports = { upload }