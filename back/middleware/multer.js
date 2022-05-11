
const res = require("express/lib/response");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images/')
  },
  filename: function (req, file, cb) {
    cb(null, `${body.userId}-${Date.now()}-${file.originalname}`.replace(/\s/g, '-'))
  }
})
const upload = multer({ storage: storage })

// const storeage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'images/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, `${body.userId}-${Date.now()}-${file.originalname}`.replace(/\s/g, '-');
//     }
// });

// function makeFilename(req, file) {
//     const fileName = `${Date.now()}-${file.originalname}`.replace(/\s/g, '-');
//     file.fileName = fileName;
//     return fileName
// }


module.exports  = {upload}

