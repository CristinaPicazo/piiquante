require('dotenv').config();
const { app, express } = require("./server");
const cors = require("cors");
const bodyParser = require('body-parser');
const { checkToken } = require('./middleware/checkToken');

const port = 3000;

// Database
require("./mongo");

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Controllers
const { signup } = require("./controllers/signup");
const { login } = require("./controllers/login");
const { getSauces } = require("./controllers/getSauces");
const { createSauce } = require("./controllers/createSauce");

// Routes
app.post('/api/auth/signup', signup);
app.post('/api/auth/login', login);
app.get('/api/sauces', checkToken, getSauces);
// app.get('/api/sauces/:id', getSauce);
app.post('/api/new-sauce', checkToken, createSauce);
// app.put('/api/sauces/:id', updateSauce);
// app.delete('/api/sauces/:id', deleteSauce);
// app.post('/api/sauces/:id/like', likeSauce);



app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});


// newUser.deleteMany({}).then(() => console.log("Removed all users"));