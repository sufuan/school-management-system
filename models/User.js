const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }

});


UserSchema.pre('save', async function (next) {

    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()



})


// UserSchema.methods.comparePassword = async function (password) {
//     return await bcrypt.compare(password, this.password)
// }


UserSchema.methods.getSignedToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET)
}

module.exports = User = mongoose.model('user', UserSchema);



























// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const studentSchema = new Schema({
 
//   parent_id: {
//     type: String,
//     required: true
//   },
//   admission_no: {
//     type: String,
    
//   },
//   roll_no: {
//     type: String,
   
//   },
//   admission_date: {
//     type: Date,

//   },
//   firstname: {
//     type: String,
//     required: true
//   },
//   middlename: {
//     type: String,
//     default: null
//   },
//   lastname: {
//     type: String,
//     required: true
//   },
//   image: {
//     type: String,
//     required: true
//   },
//   mobileno: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true
//   },
//   state: {
//     type: String,
//     default: null
//   },
//   city: {
//     type: String,
//     default: null
//   },
//   religion: {
//     type: String,
//     required: true
//   },
//   dob: {
//     type: Date,
//     required: true
//   },
//   gender: {
//     type: String,
//     required: true
//   },
//   current_address: {
//     type: String,
//     default: ""
//   },
//   permanent_address: {
//     type: String,
//     default: ""
//   },
//   blood_group: {
//     type: String,
//     required: true
//   },
//   hostel_room_id: {
//     type: String,
//     default: "0"
//   },
 
//   bank_account_no: {
//     type: String,
//     required: true
//   },
//   bank_name: {
//     type: String,
//     required: true
//   },
//   ifsc_code: {
//     type: String,
//     default: ""
//   },
//   guardian_is: {
//     type: String,
//     required: true
//   },
//   father_name: {
//     type: String,
//     required: true
//   },
//   father_phone: {
//     type: String,
//     required: true
//   },
//   father_occupation: {
//     type: String,
//     required: true
//   },
//   mother_name: {
//     type: String,
//     required: true
//   },
//   mother_phone: {
//     type: String,
//     required: true
//   },
//   mother_occupation: {
//     type: String,
//     required: true
//   },
//   guardian_name: {
//     type: String,
//     required: true
//   },
//   guardian_relation: {
//     type: String,
//     required: true
//   },
//   guardian_phone: {
//     type: String,
//     required: true
//   },
//   guardian_occupation: {
//     type: String,
//     default: ""
//   },
//   guardian_address: {
//     type: String,
//     default: ""
//   },
//   guardian_email: {
//     type: String,
//     default: ""
//   },
//   father_pic: {
//     type: String,
//     default: ""
//   },
//   mother_pic: {
//     type: String,
//     default: ""
//   },
//   guardian_pic: {
//     type: String,
//     default: ""
//   },
//   is_active: {
//     type: String,
//     required: true
//   },
//   previous_school: {
//     type: String,
//     default: ""
//   },
//   height: {
//     type: String,
//     default: ""
// }
// })
   

















