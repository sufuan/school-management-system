const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

exports.register = async (req, res, next) => {

    const { name, email, password } = req.body

    const user = await User.findOne({ email })

    if (user) {
        return res.status(409).json({
            success: false,
            message: 'user already exists'
        })
    }



    try {

        const user = await User.create({
            name,
            email,
            password
        });



        const message = 'registration  successfull !'
        sendToken(201, user, res, message)


    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

exports.login = async (req, res, next) => {

    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "please provide email and password"
        })
    }

    try {
        const user = await User.findOne({ email }).select("+password")

        if (!user) {
            return res.status(201).json({
                success: false,
                message: "invalid credentials"
            })
        }

        // const isMatch = await user.comparePassword(password)


        //--------------------------- another option to compare password--------------------

        const isMatch = await bcrypt.compare(password, user.password)

        //---------------------------------------------------------------------------------

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "invalid credentials"
            })
        }


        const message = 'login successfull !'
        sendToken(201, user, res, message)



    } catch (error) {
        console.error(`Login error: ${err.message}`);

        res.status(500).json({
            success: false,
            message: 'Server error'
        })


    }
}



const sendToken = (statusCode, user, res, message) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    res.status(statusCode).json({
        success: true,
        message,
        token
    })
}