import React, { useState } from 'react'
import { useNavigate } from 'react-router'

const RegisterPage = ({ email, setEmail, password, setPassword, repeatPassword, setRepeatPassword,
    users, setUsers }) => {
    let doubledEmail = false
    const [passwordError, setPasswordError] = useState()
    const [emailError, setEmailError] = useState()
    const navigate = useNavigate()


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
                        body: JSON.stringify({ email: email, password: password })
                    })
                        .then(await fetch('/users')
                            .then(res => { return res.json() })
                            .then(data => setUsers(data.recordset)))
                        .then(alert('Registration successful!'))
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
            <header id="header">
                <h1>REGISTER</h1>
            </header>
            <form onSubmit={() => { handleRegister() }} className='form-control'>
                <div className='registercontrol'>
                    <input
                        type="text"
                        id="email"
                        name='email'
                        className='email'
                        placeholder='Email'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}

                    />
                    <label className='errorLabel'>{emailError}</label>
                    <input
                        type="password"
                        id='password'
                        name='password'
                        className='password'
                        placeholder='Password'
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value)
                        }}
                    />
                    <label className='errorLabel'>{passwordError}</label>
                    <input
                        type="password"
                        id='repeat_password'
                        className='password'
                        placeholder='Repeat Password'
                        value={repeatPassword}
                        onChange={(event) => setRepeatPassword(event.target.value)}
                        onSubmit={() => { handleRegister() }}
                    />
                    <div className='buttons'>
                        <button
                            type="button"
                            className='login'
                            onClick={() => { handleRegister() }}
                            value="Submit"
                        >
                            Register
                        </button>
                        <button className='signup' onClick={() => { navigate('/') }}>Sign in</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default RegisterPage
