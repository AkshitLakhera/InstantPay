// Note- Always import middleware at end of importing series
const express = require("express");
const Account  = require("../db");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const { authMiddleware } = require('../middleware');
// Here in this app we  haven't made the route for adding balance to the account so we are adding random balance from our self when user get sign up
// An endpoint for user to get their balance
router.get("/balance",authMiddleware,async (req,res) => {
    const userId = req.userId;
    const account = await Account.findOne({
        userId
    });
    res.status(200).json({
        balance:account.balance
    })
})
//  An endpoint for user to transfer money to another account
router.post("/transfer",authMiddleware,async (req,res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    const{to,amount} = req.body;
    const account =  await Account.findOne({userId:req.userId}).session(session);
    if (!account || account.balance <amount){
        await session.abortTransaction();
        res.status(400).json({
            message: "Insufficient balance" 
        })
    }
    // checking transfer account is really exisits 
    const toAccount =  await Account.findOne({userId:to}).session(session);
    if(!toAccount){
        await session.abortTransaction();
        res.status(400).json({
            message: "Invalid account" 
        })
    }
    // If all conditions passes we will send money
    // first account which is going to transfer will get deducted first
    await Account.updateOne({userId:req.userId},{
        $inc:{
            balance: -amount
        }
    })
    // Account which is coming to this account is added
    await Account.updateOne({userId:to},{
        $inc:{
            balance: +amount
        }
    })
    // Commit the transaction
    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
})
module.exports=router;