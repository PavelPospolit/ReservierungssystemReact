import { React, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { createBrowserHistory } from 'history'


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

    const handleLogIn = () => {
        (async () => {
            try {
                await fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: email, password: password })
                })
                    .then((res) => {
                        return res.json()
                    })
                    .then(data => {
                        if (!data.auth) {
                            alert('Wrong Email and Password combination')
                        }
                        else {
                            fetch('/login/isUserAuth')
                                .then(res => { return res.json() })
                                .then(datas => {
                                    if (datas) {
                                        setLoggedInEmployeeID(data.id)
                                        localStorage.setItem("employeeID", data.id)
                                        setLoggedInEmployee(email)
                                        localStorage.setItem("email", email)
                                        history.replace('/Homepage')
                                        navigate('/Homepage')
                                    }
                                })

                        }
                    })
            }
            catch (err) {
                console.log(err);
            }
        })()
    }

    return (
        <>
            <header id="header">
                <h1>LOG IN</h1>
            </header>
            <form className='form-control'>
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
                    <button className='login' type='button' onClick={() => handleLogIn()}>Log in</button>
                    <button className='signup' type='button' onClick={() => { navigate('/register') }}>Sign up</button>
                </div>
            </form>
        </>
    )
}

export default LogInPage
