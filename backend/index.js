const express = require("express");
const reactrouter= require('./routes/index');
const app =  express();
app.use('/api/v1',reactrouter);


