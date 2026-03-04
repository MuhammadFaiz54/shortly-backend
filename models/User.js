const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/mysql')

const User = sequelize.define('User', {
    name: {
        allowNull: false,
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = User