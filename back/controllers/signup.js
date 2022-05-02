require('dotenv').config();
const { newUser } = require('../mongo');
const bcrypt = require('bcrypt');

console.log('signup.js');
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

module.exports = { signup };