const express = require("express");
const cors = require('cors')
app.use(cors());
const reactrouter= require('./routes/index');
const app =  express();
app.use(express.json());
app.use('/api/v1',reactrouter);


app.listen(3000,()=> {
    console.log("Server running in port 3000");
})