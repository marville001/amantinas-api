module.exports = (data) => {
    return jwt.sign(data, process.env.JWT_SECRET, {
        // payload + secret + expire time
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
