const mongoose = require("mongoose")

const employeeSchema = new mongoose.Schema({
    myUsername: {
        type: String,
        required: true

    },
    myEmail: {
        type: String,
        required: true,
        // unique: true
    },
    myPassword: {
        type: String,
        required: true
    }
})

const Register = new mongoose.model("Register", employeeSchema)
module.exports = Register