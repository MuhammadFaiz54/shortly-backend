const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { connectMySQL, sequelize} = require('./config/mysql')
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
const app = express();
app.use(express.json());

const APP_PORT = process.env.PORT;
// mongodb
mongoose.connect(MONGO_URI).then(()=>console.log("Connected to MongoDB")).catch((err)=>{console.log(err)});

// mysql
connectMySQL()
require('./models/index')
sequelize.sync()
.then(()=> console.log("Tables Ready"))
.catch(err => console.log(err))
app.get(('/'),(req, res)=>{
res.send("running");
})

// routes for mongodb
const urlRoute = require('./routes/url_routes')
app.use('/api/url',urlRoute)

// Routes for mysql
const authRoute = require('./routes/auth_routes')
app.use('/api/user',authRoute)

app.listen(APP_PORT,async()=>{
    console.log(`Server is running on port ${APP_PORT}`);
})