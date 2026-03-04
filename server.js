const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
const app = express();
const APP_PORT = process.env.PORT;
app.get(('/'),(req, res)=>{
res.send("running");
})
app.use(express.json());

// routes
const urlRoute = require('./routes/url_routes')
app.use('/api/url',urlRoute)
mongoose.connect(MONGO_URI).then(()=>console.log("Connected to MongoDB")).catch((err)=>{console.log(err)});

app.listen(APP_PORT,async()=>{
    console.log(`Server is running on port ${APP_PORT}`);
})