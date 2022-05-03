const { app, express } = require("./server");
const port = 3000;
const cors = require("cors");
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

// Database
require("./mongo");

// Middleware
app.use(cors());
app.use(express.json());

// Controllers
const { signup } = require("./controllers/signup");
const { login } = require("./controllers/login");
const { getSauces, authentification } = require("./controllers/getSauces");
const { createSauce } = require("./controllers/createSauce");

// Routes
app.post('/api/auth/signup', signup);
app.post('/api/auth/login', login);
app.get('/api/sauces', getSauces);
// app.get('/api/sauces/:id', getSauce);
app.post('/api/sauces', jsonParser, createSauce);
// app.put('/api/sauces/:id', updateSauce);
// app.delete('/api/sauces/:id', deleteSauce);
// app.post('/api/sauces/:id/like', likeSauce);



app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});


// newUser.deleteMany({}).then(() => console.log("Removed all users"));