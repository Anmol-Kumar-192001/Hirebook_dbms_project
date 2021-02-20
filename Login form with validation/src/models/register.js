const mongoose = require("mongoose")
const bcrypt=require("bcryptjs")
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
    },
    confirmPassword: {
        type: String,
        required: true
    }
})

// securing password
employeeSchema.pre("save",async function(next){
  if(this.isModified("myPassword")){
    console.log(`the current hai password is ${this.myPassword}`)
    this.myPassword=await bcrypt.hash(this.myPassword,10);
    console.log(`the current password is ${this.myPassword}`)
this.confirmPassword=undefined;
  }
    next();
})

const Register = new mongoose.model("Register", employeeSchema)
module.exports = Register