const jwt = require("jsonwebtoken");

const authmiddleware = (req, res, next) => {
    try {
        const authheader = req.headers.authorization;

        console.log("AUTH HEADER:", authheader);

        // Check authorization header
        if (!authheader) {
            return res.status(401).json({
                message: "Authorization token required",
            });
        }

        // Check Bearer format
        if (!authheader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Invalid authorization format",
            });
        }

        // Extract token
        const token = authheader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Invalid Token",
            });
        }

        // Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("DECODED USER:", decoded);

        // Attach user to request
        req.user = decoded;

        next();

    } catch (error) {
        console.log("AUTH ERROR:", error.message);

        return res.status(401).json({
            message: "Invalid or expired token",
        });
    }
};

module.exports = authmiddleware;