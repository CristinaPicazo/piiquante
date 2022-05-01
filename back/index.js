require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require("cors");
const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const port = 3000;

// Database
const { newUser } = require("./mongo");


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
    try {
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

        const user = new newUser({ email: email, password: hashedPassword });
        user
            .save()
            .then(() => res.status(201).send({ message: 'User signup with email: ' + email }))
            .catch((err) => res.status(409).send({ message: "User already registered: " + err }));
    } catch (err) {
        res.status(500).send({ message: "Internal error ", err })
    }
}

function hashPassword(password) {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
}

async function login(req, res) {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await newUser.findOne({ email: email })
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                res.status(401).send({ message: "Incorrect email or password " + err })
            }
            if (result) {
                const token = createToken(email)
                res.status(200).send({
                    userId: user?._id,
                    token: token
                })
            }
        })
    } catch (err) {
        res.status(500).send({ message: "Internal error", err })
    }
}

function createToken(email) {
    const jwtPassword = process.env.JWT_PASSWORD;
    return jwt.sign({ email: email }, jwtPassword, { expiresIn: '1h' });
}


// newUser.deleteMany({}).then(() => console.log("Removed all users"));


function getSauces(req, res) {
    const header = req.header('Authorization');
    if (!header) {
        res.status(401).send({ message: "You must be logged in" })
    }
    const token = header.split(' ')[1];
    if (!token) {
        res.status(401).send({ message: "No token provided" })
    }

    jwt.verify(token, process.env.JWT_PASSWORD, (err, decoded) => {
        handleTokenError(err, res, decoded);
    });
}

function handleTokenError(err, res, decoded) {
    if (err) {
        res.status(401).send({ message: "Invalid token" })
    }
    if (decoded) {
        res.status(200).send({ message: "You are logged in" })
    }
}