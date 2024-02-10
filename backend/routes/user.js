const express = require('express');
import { z } from "zod";
import jwt from 'jsonwebtoken';
import { User } from "../db/db";
import { JWT_SECRET } from "../config";
const router = express.Router();
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

})

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
module.exports={
  router
}