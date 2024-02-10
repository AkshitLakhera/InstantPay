const mongoose= require('mongoose');
require('dotenv').config();
mongoose.connect("mongodb+srv://admin:18UnbuxKp5q8OEev@cluster0.f3e1pxb.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }) 
.then(()=>{console.log("connected to database")})
.catch((err) => {
    console.log("Error",err)
})
// Creating mongoose schema
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

//creating mongoose modal
 const User =  mongoose.model("User",userSchema);
 
//  Exporting mongoose modal
module.exports= {
    User
}