require('dotenv').config();
const { newUser } = require('../mongo');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
    return jwt.sign({ email: email }, jwtPassword, { expiresIn: '24h' });
}



module.exports = { login };