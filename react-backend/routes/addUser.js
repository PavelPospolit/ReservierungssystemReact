var express = require('express'),
    config = require('../dbFiles/dbConfig'),
    dbOperations = require('../dbFiles/dbOperations'),
    sql = require('mssql')
var router = express.Router();


router.post('/', async function (req, res) {
    try {
        let pool = await sql.connect(config)
        let addedUser = pool.request().query(`INSERT INTO [Reservierungssystem].[dbo].[Employees]
        VALUES ('${req.body.employeeID}', '${req.body.email}', '${req.body.password}')`)
    }
    catch (err) {
        console.log(err);
    }
})

module.exports = router;