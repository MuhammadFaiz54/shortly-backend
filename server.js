const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app')
const { connectMySQL, sequelize} = require('./config/mysql')
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
const seedDataBase = require('./seeders')

const APP_PORT = process.env.PORT;
// mongodb
mongoose.connect(MONGO_URI).then(()=>console.log("Connected to MongoDB")).catch((err)=>{console.log(err)});

// mysql
connectMySQL()
require('./models/index')
sequelize.sync()
.then(async()=> {
    console.log("Tables Ready")
    await seedDataBase()

})
.catch(err => console.log(err))

app.get('/', (req, res) => {
    //            ⬆️ req, res zaroori hai! ✅
        return res.status(200).json({ message: "running" })
    })

app.listen(APP_PORT,async()=>{
    console.log(`Server is running on port ${APP_PORT}`);
})