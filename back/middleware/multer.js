const multer = require("multer");

const storage = multer.diskStorage({
  destination: "images/",
  filename: function (req, file, cb) {
    cb(null, makeFilename(file))
  }
})

function makeFilename(file) {
  try{
  const fileName = `${Date.now()}-${file.originalname}`.replace(/\s/g, '-');
  file.fileName = fileName;
  return fileName
} catch (err) {
  console.log('err:', err)
  res.status(500).send({ message: "Internal error", err })
}
}

const fileFilter = (req, file, cb) => {
  if ((file.mimetype).includes('jpeg') || (file.mimetype).includes('png') || (file.mimetype).includes('jpg')) {
    cb(null, true);
  } else {
    // cb(null, false);
    cb(new Error('Not valid picture'));
  }
}

const upload = multer({ storage: storage, fileFilter: fileFilter });

require("../mongo");


module.exports = { upload }

