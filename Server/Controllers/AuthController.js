const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ------------ Register ---------------

exports.RegisterUser = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        // check
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All Fields Require",
            });
        }

        // check user already exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                message: "User Already Exists",
            });
        }

        const hashpassword = await bcrypt.hash(password, 10);

        const createUser = await User.create({  // user create in db
            name,
            email,
            password: hashpassword,
        });

        return res.status(200).json({
            message: "User Registered Successfully",

            user: {
                id: createUser._id,
                name: createUser.name,
                email: createUser.email,
            }
        });

    } catch (error) {

        return res.status(500).json({
            message: "Server Error",
            error: error.message,
        });
    }
};

// ----------- Login ----------------

exports.LoginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "email and passowrd are required",
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Please Register First",
            });
        }

        // compare password

        const ispassword = await bcrypt.compare(
            password,
            user.password,
        );

        if (!ispassword) {
            return res.status(400).json({
                message: "Invlaid Email or Password",
            });
        }

        // generate token

        const token = jwt.sign({

            id: user._id,
            email: user.email,

        },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        return res.status(200).json({
            message: "Login Successfully Done",
            token,

            user: {
                id: user._id,
                name: user.name,
                email: user.email,

            },
        });

    } catch (error) {

        return res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
}

