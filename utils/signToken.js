const jwt = require("jsonwebtoken")

module.exports = (data) => {
    return jwt.sign(data, process.env.JWT_SECRET, {
        // payload + secret + expire time
        expiresIn: "24h",
    });
};
