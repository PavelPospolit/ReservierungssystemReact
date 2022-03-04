const { response } = require('express');
var express = require('express'),
    config = require('../dbFiles/dbConfig'),
    sql = require('mssql'),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken')
var router = express.Router();

const verifyJWT = (req, res, next) => {
    const token = req.cookies["access_token"]

    if (!token) req.auth = false
    try {
        const validToken = jwt.verify(token, `'${process.env.ACCESS_TOKEN_SECRET}'`)
        if (validToken) {
            req.auth = true
            next()
        }
    } catch (err) {
        return req.auth = false
    }
}


router.get('/isUserAuth', verifyJWT, (req, res) => {
    res.send(req.auth)
})

router.post('/', async function (req, res) {
    let email = req.body.email
    let password = req.body.password
    if (email && password) {
        let pool = await sql.connect(config)
        let addedUser = pool.request().query(`SELECT * FROM [Reservierungssystem].[dbo].[Employees]
        WHERE Emailaddress LIKE '${email}'`,
            function (error, results) {
                if (error) throw error
                if (results.recordset.length > 0) {
                    bcrypt.compare(password, results.recordset[0].Employee_Password, (error, response) => {
                        if (response) {
                            const id = results.recordset[0].EmployeeID
                            const token = jwt.sign({ id }, `'${process.env.ACCESS_TOKEN_SECRET}'`, {
                                expiresIn: 300,
                            })
                            res.cookie("access_token", token, {
                                maxAge: 60 * 60 * 24 * 30 * 1000,
                                httpOnly: true
                            })
                            res.json({ auth: true, token: token, result: results, id: id })
                        }
                        else {
                            res.json({ auth: false, result: results, message: 'Wrong username-PW combination' })
                        }
                    })
                }
                else {
                    res.json({ auth: false, result: results, message: 'no user in existance' })
                }
            })
    }
})

module.exports = router