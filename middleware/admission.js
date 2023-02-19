const Student = require("../models/Student")

const jwt = require('jsonwebtoken')

exports.protect = async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]

    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'unauthorized '
        })
    }

    try {

        const decode = jwt.verify(token, process.env.JWT_SECRET)

        const student = await Student.findById(decode.id)

        if (!student) {
            return res.status(401).json({
                success: false,
                message: ' user not found'
            })
        }

        req.student = student
        next()



    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'unauthorized'
        })
    }




}