const { DataTypes } = require('sequelize')
const sequelize = require('../config/bd')
const User = require('../models/User')
const Product = require('../models/Product')


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
    },

    idUsuario: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },

    idProduto: {
        type: DataTypes.INTEGER,
        references: {
            model: Product,
            key: 'id'
        }
    }

})

Cart.belongsTo(User, {
    foreignKey: 'idUsuario',
    as: 'user'
})

User.hasMany(Cart, {
    foreignKey: 'idUsuario',
    as: 'carts'            
});


Cart.belongsTo(Product, {
    foreignKey: 'idProduto',
    as: 'products'
})

Product.hasMany(Cart, {
    foreignKey: 'idProduto',
    as: 'carts'            
});

module.exports = Cart