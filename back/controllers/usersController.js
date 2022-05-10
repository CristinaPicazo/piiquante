const { User } = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

        const user = new User({ email: email, password: hashedPassword });
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
    console.log('req.body', req.body)
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findOne({ email: email })
        console.log('user:', user)
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
        console.log('err:', err)
        res.status(500).send({ message: "Internal error", err })
    }
}

function createToken(email) {
    const jwtPassword = process.env.JWT_PASSWORD;
    return jwt.sign({ email: email }, jwtPassword, { expiresIn: '24h' });
}



module.exports = { login, signup };