const mongoose = require("mongoose")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
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
    },
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }]
})

// generating token for user authentication
employeeSchema.methods.generateAuthToken=async function(){
try{
  const token= await jwt.sign({_id:this._id.toString()},"mynameisanmolkumardoingbackendpart");
  this.tokens=this.tokens.concat({token:token})
  await this.save();
  return token;
}catch(error){
   res.send("the error part "+error);
   console.log("the error part "+error)
}
}

// securing password by hashing
employeeSchema.pre("save",async function(next){
  if(this.isModified("myPassword")){
   
    this.myPassword=await bcrypt.hash(this.myPassword,10);
    this.confirmPassword=await bcrypt.hash(this.myPassword,10);

  }
    next();
})

const Register = new mongoose.model("Register", employeeSchema)
module.exports = Register