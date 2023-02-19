
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')


const studentSchema = new Schema({
    // admission_roll_no: {
    //     type: Number,
    //     required: [true, 'Admission Roll No. is required.']
    // },
    roll_no: {
        type: Number,
        default: 100000,
        required: [true, 'roll is req']
    },
    firstname: {
        type: String,
        required: [true, 'First Name is required.']
    },
    password: {
        type: String,
    },
    lastname: {
        type: String,
        required: [true, 'Last Name is required.']
    },
    image: {
        type: String,
        // required: [true, 'Student Image is required.']
    },
    mobileno: {
        type: String,
        required: [true, 'Mobile Number is required.']
    },
    email: {
        type: String,
        required: [true, 'Email is required.']
    },
    date_of_birth: {
        type: String,
        required: [true, 'Date of Birth is required.']
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: [true, 'Gender is required.']
    },
    parent_id: {
        type: Number,
    },
    religion: String,
    current_address: String,
    permanent_address: String,
    blood_group: String,
    bank_account_no: String,
    bank_name: String,
    ifsc_code: String,
    guardian_is: String,
    father_name: String,
    father_phone: String,
    father_occupation: String,
    mother_name: String,
    mother_phone: String,
    mother_occupation: String,
    guardian_name: String,
    guardian_relation: String,
    guardian_phone: String,
    guardian_occupation: String,
    guardian_address: String,
    guardian_email: String,
    father_pic: String,
    mother_pic: String,
    guardian_pic: String,
    is_active: {
        type: String,
        enum: ['yes', 'no']
    },
    previous_school: String,
    height: String,
    weight: String,
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: Date
});


studentSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})





const Student = mongoose.model("Student", studentSchema)


module.exports = Student

