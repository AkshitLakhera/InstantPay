const mongoose= require('mongoose');
require('dotenv').config();
mongoose.connect("mongodb+srv://admin:18UnbuxKp5q8OEev@cluster0.f3e1pxb.mongodb.net/paytm", {
  }) 
.then(()=>{console.log("connected to database")})
.catch((err) => {
    console.log("Error",err)
})
// Creating mongoose user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    firstName :{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
    lastName: {
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
    password:{
        type:String,
        required:true,
        minLength:6
    }
})
// Mongoose schema for account
const accountSchema = new mongoose.Schema({
    balance:{
        type:Number, //You can set default value if needed
        required:true
    },
    userId : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }

})
//creating mongoose modal
 const User =  mongoose.model("User",userSchema);
 const Account = mongoose.model("Account",accountSchema);
//  Exporting mongoose modal
module.exports= {
    User,
    Account
}
