const {DataTypes} = require ('sequelize')
const { sequelize } = require('../config/mysql')

const UserRole = sequelize.define('UserRole',{
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    role_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
})

module.exports = UserRole