const express = require("express");
const authMiddlware =require("../middleware");
const Account  = require("../db/db")
const router = express.Router();
// An endpoint for user to get their balance
router.get("/balance",authMiddlware,async (req,res) => {
    const userId = req.userId;
    const account = await Account.findOne({
        userId
    });
    res.status(200).json({
        balance:account.balance
    })
})
module.exports=router;