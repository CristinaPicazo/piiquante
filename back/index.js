require('dotenv').config();
const cors = require("cors");
const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const port = 3000;

// Database
const mongoose = require('mongoose');
const password = process.env.DB_PASSWORD;
const username = process.env.DB_USER;
const dbName = process.env.DB_NAME;
const uri = `mongodb+srv://${username}:${password}@cluster0.rxnku.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(uri).then((() => {
    console.log("Connected to database!");
})).catch(err => {
    console.log("Connection failed!", err);
});

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

const userModel = mongoose.model('User', userSchema);


// Middelware
app.use(cors());
app.use(bodyParser.json());

app.post('/api/auth/signup', signup);
app.post('/api/auth/login', login);
app.get('/api/sauces', getSauces);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

function signup(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    if (email === "") {
        res.status(400).send("Email is required");
        return
    }

    if (password === "") {
        res.status(400).send("Password is required");
        return
    }

    const user = new userModel({ email: email, password: password });
    user
        .save()
        .then(res => console.log("User saved successfully", res))
        .catch(err => console.log("Error saving user", err));

    res.send({ message: 'User signup with email: ' + email });
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