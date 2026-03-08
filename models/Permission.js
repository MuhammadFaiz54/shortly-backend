const {DataTypes} = require('sequelize')
const {sequelize} = require('../config/mysql')

const Permission = sequelize.define('Permission',{
    name:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

module.exports= Permission