const jwt = require('jsonwebtoken');
const JWT_SECRET = require("./config")
// Format of middleware in express.js
const authMiddleware = (req,res,next) => {
    const authHeader = req.headers[Authorization]
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({});
    }
    const token = authHeader.split("")[1];
     try {
        const decoded = jwt.verify(token,JWT_SECRET)
        req.userId=decoded.userId;
        next()
     } catch(err){
        return res.status(403).json({});
    }
} 
exports.module={
    authMiddleware
};