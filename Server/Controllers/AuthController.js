const User = require("../Models/User");  // DB user info rakhega
const bcrypt = require("bcrypt");  // for hash password
const jwt = require("jsonwebtoken"); // build token after login success

// ------------ Register ---------------

exports.RegisterUser = async (req, res) => {

    try {

        const { name, email, password } = req.body;  // data frontend se mangwa liya

        // check
        if (!name || !email || !password) {  // check
            return res.status(400).json({
                message: "All Fields Require",
            });
        }

        // check user already exists
        const userExists = await User.findOne({ email });  // findOne email in DB

        if (userExists) {  // email phle se hai to => 400(st)
            return res.status(400).json({
                message: "User Already Exists",
            });
        }

        const hashpassword = await bcrypt.hash(password, 10); // hashPassword bdskiv$$#FSEF

        const createUser = await User.create({  // user create in db
            name,
            email,
            password: hashpassword,
        });

        return res.status(200).json({ // successfull
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

        const { email, password } = req.body;  // data come's

        if (!email || !password) {  // check
            return res.status(400).json({
                message: "email and passowrd are required",
            });
        }

        const user = await User.findOne({ email });  // agar email phle se hai login time pr to success

        if (!user) {  // nhi hai to error
            return res.status(400).json({
                message: "Please Register First",
            });
        }

        // compare password

        const ispassword = await bcrypt.compare(  
            password,  // register password
            user.password,  // rlogin password
        );

        if (!ispassword) {  // check password match oe not
            return res.status(400).json({
                message: "Invlaid Email or Password",
            });
        }

        // generate token

        const token = jwt.sign({ // sb set hai to built token

            id: user._id,  // userID
            email: user.email, // user eamil

        },
            process.env.JWT_SECRET,   // secret key .env
            {
                expiresIn: "7d",
            }
        );

        return res.status(200).json({
            message: "Login Successfully Done",
            token,   // token build send

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

