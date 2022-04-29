require('dotenv').config();
const bcrypt = require('bcrypt');
const cors = require("cors");
const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const port = 3000;

// Database
const { userModel } = require("./mongo");


// Middelware
app.use(cors());
app.use(bodyParser.json());

app.post('/api/auth/signup', signup);
app.post('/api/auth/login', login);
app.get('/api/sauces', getSauces);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

async function signup(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const hashedPassword = await hashPassword(password);

    if (email === "") {
        res.status(400).send("Email is required");
        return
    }

    if (password === "") {
        res.status(400).send("Password is required");
        return
    }

    const user = new userModel({ email: email, password: hashedPassword });
    user
        .save()
        .then(res => console.log("User saved successfully", res))
        .catch(err => console.log("Error saving user", err));

    res.send({ message: 'User signup with email: ' + email });
}

function hashPassword(password) {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
}

function login(req, res) {
    res.send({
        userId: 'string',
        token: 'token'
    }
    );
}

function getSauces(req, res) {
    res.send('Hello World!');
}