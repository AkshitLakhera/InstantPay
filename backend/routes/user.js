const express = require('express');
const router = express.Router();
const { z } = require('zod');;
const jwt = require('jsonwebtoken');
const {User,Account} = require("../db")
const JWT_SECRET = require("../config");
const { authMiddleware } = require('../middleware');

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
//  creating a account for user who sign-up
await Account.create({
  userId,
  balance:1 + Math.random * 1000
})
  
  // To clarify why I am using userId here is as it is unqiue and this will help us to make unique token for each unique userId
  const token = jwt.sign({userId},JWT_SECRET)
  

  // returning jwt here
  res.status(200).json({
    message: "User created successfully",
    token: token
  })

})
//      sign in route
// While signin or  we can say login. this time too we have to genrate the json token so that we can use it in further subsequent request to server
//    Sign in schema
const signinbody = z.object({
  username:z.string().email(),
  password:z.string().min(6),
})
router.post("/signin",async (req,res)  => {
  const validateuser= signinbody.safeParse(req.body)
  if(!validateuser){
   return  res.status(411).json({message: "Incorrect inputs"})
  }
  const user = await User.find({
    username:req.body.username,
    password:req.body.passsword
  })
  if (user) {
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
//  Update scehma zod

const updateBody = z.object({
  firstName:z.string().optional(),
  lastName:z.string().optional(),
  password:z.string().optional()
})

router.put('/',authMiddleware,async(req ,res) => {
const validateuser = updateBody.safeParse(req.body)
if (!validateuser){
res.status(411).json({
  message: "Error while updating information"
})
}
// updateOne function in mongoose take id (unique) as input ,it identify which user we have to update
await User.updateOne(req.body, {
  _id: req.userId
})
res.json({
  message: "Updated successfully"
})
})

//      Route to get users from the backend, filterable via firstName/lastName
//In Express.js, when you make a request with query parameters, they automatically become part of the URL and are visible. The req.query object in Express.js automatically parses these parameters from the URL for you to access and use in your server-side code.
router.get("/bulk",async(req,res) => {
 const filteredName= req.query.filter || "";
 const users = await User.find({
  $or : [{
    firstName : {
      "$regex":filteredName
    },
    lastName : {
      "$regex" : lastName
    }
  }]
 })
 res.status(200).json({
  user:users.map( user =>({
    username: user.username,
    firstName: user.firstName,
    _id: user._id

  }) )
 })
})
module.exports = router;
