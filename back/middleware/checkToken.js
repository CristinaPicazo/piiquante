const jwt = require('jsonwebtoken');

function checkToken(req, res, next) {
    try {
        const header = req.header('Authorization');
        if (!header) {
            res.status(401).send({ message: "You must be logged in" })
        }
        const token = header.split(' ')[1];
        if (!token) {
            res.status(401).send({ message: "No token provided" })
        }

        jwt.verify(token, process.env.JWT_PASSWORD, (err, decoded) => {
            console.log('decoded:', decoded)
            if (err) {
                return res.status(401).send({ message: "Invalid token" + err })
            }
            req.userId = decoded.userId;
        });
        next()
    }
    catch (err) {
        console.log('error:', err)
        return res.status(500).send(err);
    }
}

module.exports = { checkToken };

