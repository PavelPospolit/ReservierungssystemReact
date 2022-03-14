import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { createBrowserHistory } from 'history'

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

    const handleRegister = (evt) => {
        setEmailError('')
        setPasswordError('')
        if (password === repeatPassword) {
            (async () => {
                try {
                    await fetch('/addUser', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ email: email, password: password })
                    }).then((res) => {
                        return res.json()
                    })
                        .then(data => {
                            if (data.exist) {
                                setEmailError('Email already registered! Try logging in!')
                            }
                            else alert('Registration successful!')
                            setEmail('')
                            setPassword('')
                            setRepeatPassword('')
                        })
                }
                catch (err) {
                    console.log(err);
                }
            })()
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
                            onClick={() => { handleRegister() }}
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
