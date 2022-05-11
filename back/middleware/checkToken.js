const jwt = require('jsonwebtoken');

function checkToken(req, res, next) {
    const header = req.header('Authorization');
    if (!header) {
        res.status(401).send({ message: "You must be logged in" })
    }
    const token = header.split(' ')[1];
    if (!token) {
        res.status(401).send({ message: "No token provided" })
    }

    jwt.verify(token, process.env.JWT_PASSWORD, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Invalid token" + err })
        }
    });
    next()
}

module.exports = { checkToken };

