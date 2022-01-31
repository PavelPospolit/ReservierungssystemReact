var express = require('express'),
    config = require('../dbFiles/dbConfig'),
    dbOperations = require('../dbFiles/dbOperations'),
    sql = require('mssql')
var router = express.Router();



/* GET users listing. */
router.get('/', async function (req, res, next) {
    dbOperations.getRooms()
        .then(rooms => res.json(rooms))
});

module.exports = router;