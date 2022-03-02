import React from 'react'
import { useNavigate } from 'react-router'

const LogInPage = ({ email, setEmail, password, setPassword, setLoggedInEmployeeID, setLoggedInEmployee, }) => {
    const navigate = useNavigate()


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
                            setLoggedInEmployeeID(data.id)
                            localStorage.setItem("employeeID", data.id)
                            setLoggedInEmployee(email)
                            localStorage.setItem("email", email)
                            navigate('/Homepage')
                        }
                    }
                    )
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
            <form onSubmit={() => { handleLogIn() }} className='form-control'>
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
                        onChange={(event) => setPassword(event.target.value)}
                    />

                </div>
                <div className='buttons'>
                    <button className='login' type='button' onClick={() => handleLogIn()}>Log in</button>
                    <button className='signup' onClick={() => { navigate('/register') }}>Sign up</button>
                </div>
            </form>
        </>
    )
}

export default LogInPage
