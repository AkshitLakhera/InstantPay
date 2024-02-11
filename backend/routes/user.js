const express = require('express');
const { z } = require('zod');;
const jwt = require('jsonwebtoken');
const User = require("../db/db")
const JWT_SECRET = require("../config")
const router = express.Router();
const authMiddlware = require("../middleware")
//    Defining schemaas
const userSchema = z.object({
  username:z.string().email(),
  firstName:z.string().min(3),
  lastName:z.string().min(3),
  password:z.string().min(6),

})
// After completing I will  add password hashing in this project as every passsword which get saved in data based properly hasded 



//             Sign up  
router.post("/signup", async (req,res) => {
 const validateuser= userSchema.safeParse(req.body)
 if(!validateuser){
  return  res.status(411).json({message: "Email already taken / Incorrect inputs"})
 }

 const existingUser= await User.findOne({username:req.body.username});
 if(!existingUser){
  return res.status(411).json({message: "Email already taken / Incorrect inputs"})
 } 
 // creating user in database

const user = await User.create({
  username:req.body.username,
  firstName:req.body.firstName,
  lastName:req.body.lastName,
  password:req.body.password
  
  })
  const userId = user._id
  
  // To clarify why I am using userId here is as it is unqiue and this will help us to make unique token for each unique userId
  const token = jwt.sign({userId},JWT_SECRET)
  
  
  // returning jwt here
  res.status(200).json({
    message: "User created successfully",
    token: "jwt"
  })

})

//      sign in route
// While signin or  we can say login. this time too we have to genrate the json token so that we can use it in further subsequent request to server
//    Sign in schema
const signinbody = Zod.object({
  username:z.string().email(),
  passsword:z.string().min(6),
})
router.post("/signin",async (req,res)  => {
  const validateuser= signinbody.safeParse(req.body)
  if(!validateuser){
   return  res.status(411).json({message: "Incorrect inputs"})
  }
  const isUser = await User.find({
    username:req.body.username,
    password:req.body.passsword
  })
  if (isUser) {
    const token = jwt.sign({
        userId: user._id
    }, JWT_SECRET);

    res.json({
        token: token
    })
    return;
}


res.status(404).json({
  messsage:"Error while loginin"
})
})

//        Route to update user information

router.put("/",authMiddlware,async(req ,res) => {
const password = req.password
const firstName = req.firstName
const lastName = req.lastName
})
module.exports={
  router
}