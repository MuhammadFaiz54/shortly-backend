const { Sequelize } = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(
  process.env.DB_NAME,      // "shortly"
  process.env.DB_USER,      // "root"
  process.env.DB_PASSWORD,  // "" 
  {
    host: process.env.DB_HOST,
    dialect: 'mysql'
  }
)

const connectMySQL = async () => {
  try {
    await sequelize.authenticate()
    console.log('MySQL connected ✅')
  } catch (error) {
    console.log('MySQL Error:', error.message)
  }
}

module.exports = { sequelize, connectMySQL }