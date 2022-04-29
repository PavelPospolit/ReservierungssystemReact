import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { createBrowserHistory } from 'history'
import handleRegister from '../functions/handleRegister'

const RegisterPage = ({ email, setEmail, password, setPassword, repeatPassword, setRepeatPassword, setLoggedInEmployee, setLoggedInEmployeeID }) => {

    const [passwordError, setPasswordError] = useState()
    const [emailError, setEmailError] = useState()
    const navigate = useNavigate()
    let history = createBrowserHistory()

    useEffect(() => {
        if (localStorage.getItem("employeeID") != null) {
            fetch('/login/isUserAuth')
                .then(res => { return res.json() })
                .then(datas => {
                    console.log(datas)
                    if (datas) {
                        setLoggedInEmployeeID(localStorage.getItem("employeeID"))
                        setLoggedInEmployee(localStorage.getItem("email"))
                        history.replace('/Homepage')
                        navigate('/Homepage')
                    }
                })
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setEmail('')
        setPassword('')
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <header id="header">
                <h1>REGISTER</h1>
            </header>
            <form className='form-control'>
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
                        onKeyPress={(event) => {
                            if (event.key === "Enter") {
                                handleRegister()
                            }
                        }}
                    />
                    <div className='buttons'>
                        <button
                            type="button"
                            className='login'
                            onClick={() => { handleRegister(email, password, repeatPassword, setEmailError, setPasswordError, setEmail, setPassword, setRepeatPassword) }}
                            value="Submit"
                        >
                            Register
                        </button>
                        <button className='signup' type='button' onClick={() => { navigate('/') }}>Sign in</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default RegisterPage
