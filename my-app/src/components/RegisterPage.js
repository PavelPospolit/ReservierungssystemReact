import React, { useState, useEffect } from 'react'

const RegisterPage = ({ logIn, setLogIn, email, setEmail, password, setPassword, repeatPassword, setRepeatPassword,
    users, setUsers, addedUser, setaddedUser }) => {
    let doubledEmail = false
    const [employeeID, setEmployeeID] = useState(0)
    const [passwordError, setPasswordError] = useState()
    const [emailError, setEmailError] = useState()

    useEffect(() => {
        users.map(employee => {
            if (employeeID <= employee.EmployeeID) {
                setEmployeeID(employee.EmployeeID + 1)
            }
            return employeeID
        })
    }, [employeeID, users])



    const handleRegister = (evt) => {

        setEmailError('')
        setPasswordError('')

        users.map(employee => {
            if (email === employee.Emailaddress) {
                doubledEmail = true
            }
            return doubledEmail
        })

        if (doubledEmail) {
            setEmailError('email already in use!')
        }

        if (password === repeatPassword && !doubledEmail) {

            (async () => {
                try {
                    await fetch('/addUser', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ employeeID: employeeID, email: email, password: password })
                    })
                        .then(await fetch('/users')
                            .then(res => { return res.json() })
                            .then(data => setUsers(data.recordset)))
                }
                catch (err) {
                    console.log(err);
                }
            })()


            setEmail('')
            setPassword('')
            setRepeatPassword('')
        }
        if (password !== repeatPassword) {
            setPasswordError('passwords do not match')
        }
    }
    return (
        <>
            <header>
                <h1>REGISTER</h1>
            </header>
            <nav>
                <button
                    onClick={() => { setLogIn(true) }}
                    className='btn'
                >
                    change to logIn page
                </button>
            </nav>
            <form onSubmit={() => { handleRegister() }} className='form-control'>
                <div >
                    <label>Email</label>
                    <input
                        type="text"
                        id="email"
                        name='email'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}

                    />
                    <label className='errorLabel'>{emailError}</label>
                    <label>Password</label>
                    <input
                        type="password"
                        id='password'
                        name='password'
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value)
                        }}
                    />
                    <label className='errorLabel'>{passwordError}</label>
                    <br />
                    <label>Repeat Password</label>
                    <input
                        type="password"
                        id='repeat_password'
                        value={repeatPassword}
                        onChange={(event) => setRepeatPassword(event.target.value)}
                        onSubmit={() => { handleRegister() }}
                    />
                    <button
                        type="button"
                        className='btn'
                        onClick={() => { handleRegister() }}
                        value="Submit"
                    >
                        REGISTER
                    </button>
                </div>
            </form>
        </>
    )
}

export default RegisterPage
