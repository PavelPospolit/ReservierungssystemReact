var express = require('express'),
    config = require('../dbFiles/dbConfig'),
    dbOperations = require('../dbFiles/dbOperations'),
    sql = require('mssql')
var router = express.Router();


router.post('/', async function (req, res) {
    try {
        let pool = await sql.connect(config)
        let addedReservation = pool.request().query(`INSERT INTO [Reservierungssystem].[dbo].[Reservations] 
        (EmployeeID, Roomnumber, Starting_Date, Ending_Date)
            VALUES (${req.body.employeeID}, ${req.body.roomnumber},
                 '${req.body.startingDate}', '${req.body.endingDate}')`)
    }
    catch (err) {
        console.log(err);
    }
})

module.exports = router;