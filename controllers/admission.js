const Student = require("../models/Student")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { default: mongoose } = require("mongoose")


exports.registerStudents = async (req, res, next) => {

    const { email } = req.body


    // check if user is already registered 

    // const student = await Student.findOne({ email })
    // if (student) {
    //     return res.status(409).json({
    //         success: false,
    //         message: 'email is already registerd'
    //     })
    // }


    try {
        const lastRollNumber = await Student.findOne({}).sort({ 'roll_no': -1 });

        const newRollNumber = lastRollNumber ? lastRollNumber.roll_no + 1 : 100000;



        // const paddedRollNumber = String(newRollNumber).padStart(6, '0');



        function generateRandomString() {
            const random = Math.random().toString(36).substring(2, 8);
            return random;
        }
        const password = generateRandomString()




        const student = await Student.create({

            ...req.body,
            roll_no: newRollNumber,
            password
        }


        )

        // const newData = Object.assign({}, student._doc)

        // const { email } = newData


        // const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET)

        res.status(200).json({
            success: true,
            message: 'user registered successfully',
            // token,
            data: {
                email,
                password: password
            }
        })





    } catch (err) {
        if (err instanceof mongoose.Error.ValidationError) {
            const errors = Object.values(err.errors).map(error => error.message);
            res.status(400).json({
                success: false,
                message: errors.join(', ')
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
        console.log(err.message)

    }



}

exports.getstudent = async (req, res) => {

    try {
        const student = await Student.find({})

        res.status(200).json({
            success: true,
            data: student,
        })
    } catch (error) {
        console.log(error)
    }
}



exports.login = async (req, res, next) => {


    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'provide email and password'
        })
    }


    try {
        const student = await Student.findOne({ email })


        if (!student) {
            res.status(400).json({
                success: false,
                message: 'user not found'
            })
        }


        const isMatch = await bcrypt.compare(password, student.password)

        if (!isMatch) {
            res.status(401).json({
                success: false,
                message: 'invalid cred'
            })
        }

        const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET)

        res.status(200).json({
            success: true,
            message: 'user registered successfully',
            token,

        })


    } catch (error) {

    }








}



// const sendToken = (statusCode, res, student, message, data) => {
//     const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET)
//     res.status(statusCode).json({
//         success: true,
//         message,
//         token

//     })
// }




