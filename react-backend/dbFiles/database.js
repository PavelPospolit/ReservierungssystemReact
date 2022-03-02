const Sequelize = require('sequelize')

module.exports = new Sequelize('Reservierungssystem', 'Test', 'Test', {
    host: 'BE1BD320',
    dialect: 'mssql',
    operatorAliases: false
})
