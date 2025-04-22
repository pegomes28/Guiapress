const Sequilize = require("sequelize");

const connection = new Sequilize('guiapress3', 'root', '1234',{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection;
