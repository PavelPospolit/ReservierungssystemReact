const config = require('./dbConfig'),
    sql = require('mssql')

const getEmployees = async () => {
    try {
        let pool = await sql.connect(config)
        let employees = pool.request().query('select * from [Reservierungssystem].[dbo].[Employees]')
        return (employees)
    }
    catch (err) {
        console.log(err);
    }
}
const getRooms = async () => {
    try {
        let pool = await sql.connect(config)
        let rooms = pool.request().query('select * from [Reservierungssystem].[dbo].[Rooms]')
        return rooms
    }
    catch (err) {
        console.log(err);
    }
}
const getReservations = async () => {
    try {
        let pool = await sql.connect(config)
        let reservations = pool.request().query('select * from [Reservierungssystem].[dbo].[Reservations]')
        return reservations
    }
    catch (err) {
        console.log(err);
    }
}


module.exports = {
    getEmployees, getRooms, getReservations
}