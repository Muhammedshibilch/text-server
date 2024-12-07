const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: "Authentication token required" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWTPASSWORD);
        req.user = decoded; 
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};

module.exports = authenticate;