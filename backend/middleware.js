// const jwt = require('jsonwebtoken');
// const JWT_SECRET = require("./config")
// // Format of middleware in express.js
// const authMiddleware = (req,res,next) => {
//     const authHeader = req.headers[Authorization]
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         return res.status(403).json({});
//     }
//     const token = authHeader.split("")[1];
//      try {
//         const decoded = jwt.verify(token,JWT_SECRET)
//         // : In many authentication scenarios, the user ID is an important piece of information needed for subsequent processing of the request. By assigning decoded.userId (which presumably holds the user ID extracted from the JWT payload) to req.userId, the user ID becomes available to subsequent middleware functions or route handlers in the Express.js application.
//     //    We are assigning decoded.userID which we get after verifying jwt and that's the payload.
//     // After that we will use it in our further  request
//         req.userId=decoded.userId;
//         next()
//      } catch(err){
//         return res.status(403).json({});
//     }
// } 
// module.exports={
//     authMiddleware
// };
const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({});
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        req.userId = decoded.userId;

        next();
    } catch (err) {
        return res.status(403).json({});
    }
};

module.exports = {
    authMiddleware
}