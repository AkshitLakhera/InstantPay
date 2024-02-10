const express = require("express");
const cors = require('cors')
const mainRouter= require('./routes/index');
const app =  express();
app.use(express.json());
app.use(cors());
// route all the request which start with /api/v1 to reactRouter
app.use('/api/v1',mainRouter);


app.listen(3000,()=> {
    console.log("Server running in port 3000");
})