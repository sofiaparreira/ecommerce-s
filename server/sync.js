const sequelize = require('./config/bd');
const User = require('./models/User');
const Product = require('./models/Product');

sequelize.sync()
    .then(() => {
        console.log('Banco de dados atualizado.');
    })
    .catch(error => {
        console.error('Erro ao sincronizar o banco de dados:', error);
    });