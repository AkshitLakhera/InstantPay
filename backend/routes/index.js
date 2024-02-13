const express = require('express');
const userRouter = require('./user');
const accountRouter=require('./account');
const router = express.Router();
// Import the userRouter in backend/routes/index.js so all requests to /api/v1/user get routed to the userRouter.

router.use("/user",userRouter);
router.use("/account",accountRouter);
module.exports = router;
