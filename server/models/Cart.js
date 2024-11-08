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

    precoTotal: {
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
        },
        onUpdate: 'CASCADE', 
        onDelete: 'CASCADE',
    },

    idProduto: {
        type: DataTypes.INTEGER,
        references: {
            model: Product,
            key: 'id'
        },
        onUpdate: 'CASCADE', 
        onDelete: 'CASCADE',
    }

})

Cart.belongsTo(User, { foreignKey: 'idUsuario '})
Cart.belongsTo(Product, { foreignKey:  'idProduto '})
User.hasMany(Cart, { foreignKey: 'idUsuario' });
Product.hasMany(Cart, { foreignKey: 'idProduto' });

module.exports = Cart