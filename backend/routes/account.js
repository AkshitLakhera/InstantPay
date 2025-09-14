// Note- Always import middleware at end of importing series
const express = require("express");
const { Account,Transaction }  = require("../db");
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
     console.log(account.balance)
     res.status(200).json({
        balance:account.balance
    })
})
//  An endpoint for user to transfer money to another account
router.post("/transfer", authMiddleware, async (req, res) => {
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        const { to, amount,note } = req.body;
        console.log("Amount:", amount); // Log the amount to check if it's valid
        const account = await Account.findOne({ userId: req.userId }).session(session);
        if (!account || account.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient balance" 
            });
        }
        const toAccount = await Account.findOne({ userId: to }).session(session);
        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid account" 
            });
        }
        await Account.updateOne({ userId: req.userId }, {
            $inc: { balance: -amount }
        });
        await Account.updateOne({ userId: to }, {
            $inc: { balance: +amount }
        });
    // Record transaction
    const transaction = await Transaction.create({
        fromUser: req.userId,
        toUser: to,
        amount,
        note,
      });
        await session.commitTransaction();
        res.json({
            message: "Transfer successful",
            transaction,
        });
    } catch (error) {
        console.error("Transfer error:", error); // Log any errors for debugging
        res.status(500).json({
            message: "Internal server error"
        });
    }
});
//route to get history of transaction
router.get("/transactions/history", authMiddleware, async (req, res) => {
    const userId = req.userId;
  
    try {
      const transactions = await Transaction.find({
        $or: [{ fromUser: userId }, { toUser: userId }],
      })
        .populate("fromUser", "firstName lastName")
        .populate("toUser", "firstName lastName")
        .sort({ date: -1 }); // latest first
  
      res.json({ 
        success: true,
        userId: req.userId,
        transactions 
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ 
        success: false,
        message: "Internal server error" 
      });
    }
  });

module.exports=router;