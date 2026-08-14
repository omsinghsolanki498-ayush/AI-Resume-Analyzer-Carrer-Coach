const jwt = require("jsonwebtoken");

const authmiddleware  = async (req, res) => {
    try{

        const authheader = req.headers.authorization;

        if(!authheader) {
            return res.status(401).json({
                message : "Authorization token required",
            });
        }

        const token = authheader.split(" ")[1];

        if(!token) {
            return res.status(401).json({
                message : "Invlid Token",
            });
        }

        const decoded = jwt.verify (
            token,
            process.env.JWT_SECRET
        );
        next();

    }catch(error) {
          
        return res.status(401).json({
            message : "Invlaid & expire Token",

        });
    }
}

module.exports = authmiddleware;