var express = require('express'),
    config = require('../dbFiles/dbConfig'),
    dbOperations = require('../dbFiles/dbOperations'),
    sql = require('mssql')
var router = express.Router();


router.post('/', async function (req, res) {
    try {
        let pool = await sql.connect(config)
        let cancelReservation = pool.request().query(`DELETE FROM [Reservierungssystem].[dbo].[Reservations] WHERE Ending_Date like '${req.body.now}'`)
    }
    catch (err) {
        console.log(err);
    }
})

module.exports = router;