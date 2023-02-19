const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.protect = async (req, res, next) => {

    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }



    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'unauthorized you need to login'
        })
    }


    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(decode.id)

        if (!user) {
            return res.status(401).json({
                success: false,
                message: ' user not found'
            })
        }




        req.user = user
        next()


    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'unauthorized'
        })
    }





}