var express = require('express'),
    config = require('../dbFiles/dbConfig'),
    sql = require('mssql'),
    bcrypt = require('bcryptjs')
var router = express.Router();
const { registerValidation } = require('../validation')


router.post('/', async function (req, res) {
    //validation
    const { error } = registerValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //new user creation
    const user = {
        email: req.body.email,
        password: hashedPassword
    }
    try {
        let pool = await sql.connect(config)
        let addedUser = pool.request().query(`INSERT INTO [Reservierungssystem].[dbo].[Employees]
         (Emailaddress, Employee_Password)
         VALUES ('${user.email}', '${user.password}')`)
        res.send({ user: user.email })
    }
    catch (err) {
        console.log(err);
    }
})

module.exports = router;