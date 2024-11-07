const { DataTypes } = require('sequelize')
const sequelize = require('../config/bd')

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    }, 
    
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },

    tipo: {
        type: DataTypes.ENUM(anel, colar, Pulseiras, Brincos),
        allowNull: false
    },
    
    preco: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },

    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    }


})

module.exports = Product;