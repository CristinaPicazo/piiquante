const { app, express } = require("./server");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const port = 3000;

// Database
require("./mongo");

// Middleware
const { checkToken } = require("./middleware/checkToken");
const { upload } = require("./middleware/multer");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Controllers
const { signup } = require("./controllers/signup");
const { login } = require("./controllers/login");
const { getSauces } = require("./controllers/getSauces");
const { getSauceById } = require("./controllers/getSauceById");
const { createSauce } = require("./controllers/createSauce");
const { deleteSauce } = require("./controllers/deleteSauce");

// Routes
app.post('/api/auth/signup', signup);
app.post('/api/auth/login', login);
app.get('/api/sauces', checkToken, getSauces);
app.get('/api/sauces/:id', checkToken, getSauceById);
app.post('/api/sauces', checkToken, upload.single("image"), createSauce);
// app.put('/api/sauces/:id', checkToken, updateSauce);
app.delete('/api/sauces/:id', checkToken, deleteSauce);
// app.post('/api/sauces/:id/like', checkToken, likeSauce);

// Listen
app.use("/images", express.static(path.join(__dirname, "images")));
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});


// newUser.deleteMany({}).then(() => console.log("Removed all users"));