const { DataTypes } = require('sequelize')
const sequelize = require('../config/bd')

const Cart = sequelize.define('Cart', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING
    },
    preco: {
        type: DataTypes.DECIMAL(10, 2)
    },
    quantidade: {
        type: DataTypes.INTEGER
    }
})

module.exports = Cart