const mongoose= require('mongoose');
mongoose.connect('mongodb+srv://admin:18UnbuxKp5q8OEev@cluster0.f3e1pxb.mongodb.net/')
.then(()=>{console.log("connected to database")})
.catch((err) => {
    console.log("Error",err)
})
// Creating mongoose schema
const userSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    password:String,
})

//creating mongoose modal
 const User =  mongoose.Model("User",userSchema);
//  Exporting mongoose modal
module.exports= {
    User
}