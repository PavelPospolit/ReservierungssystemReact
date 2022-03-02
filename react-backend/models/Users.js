const Sequelize = require('sequelize')
const db = require('../dbFiles/database')

const Users = db.define(
    "Employees",
    {
        Emailaddress: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Employee_Password: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }
)
module.exports = Users