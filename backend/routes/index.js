const express = require('express');
const router = express.Router();
const userRouter = require('./user');
// Import the userRouter in backend/routes/index.js so all requests to /api/v1/user get routed to the userRouter.

router.use("/user",userRouter);
module.exports = router;