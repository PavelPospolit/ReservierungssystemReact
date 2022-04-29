import { React, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { createBrowserHistory } from 'history'
import handleLogIn from '../functions/handleLogin'


const LogInPage = ({ email, setEmail, password, setPassword, setLoggedInEmployeeID, setLoggedInEmployee }) => {

    const navigate = useNavigate()
    let history = createBrowserHistory()

    useEffect(() => {
        if (localStorage.getItem("employeeID") != null) {
            fetch('/login/isUserAuth')
                .then(res => { return res.json() })
                .then(datas => {
                    if (datas) {
                        setLoggedInEmployeeID(localStorage.getItem("employeeID"))
                        setLoggedInEmployee(localStorage.getItem("email"))
                        history.replace('/Homepage')
                        navigate('/Homepage')
                    }
                })
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <header id="header">
                <h1>LOG IN</h1>
            </header>
            <form className='form-control'>
                <div className='registercontrol'>
                    <div>
                        <input
                            type="text"
                            id='email'
                            className='emaillogin'
                            placeholder='Email'
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <input
                            type="password"
                            id='password'
                            className='password'
                            placeholder='Password'
                            onKeyPress={(event) => {
                                if (event.key === "Enter") {
                                    handleLogIn()
                                }
                            }}
                            onChange={(event) => setPassword(event.target.value)}
                        />

                    </div>
                    <div className='buttons'>
                        <button className='login' type='button' onClick={() => handleLogIn(email, password, setLoggedInEmployeeID, setLoggedInEmployee, navigate)}>Log in</button>
                        <button className='signup' type='button' onClick={() => { navigate('/register') }}>Sign up</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default LogInPage
