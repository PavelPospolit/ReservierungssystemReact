import React, { useState, useEffect } from 'react'
import HomePage from './HomePage'

const LogInPage = ({ logIn, setLogIn, email, setEmail, password, setPassword, users, setUsers, reservations, setReservations, cancelReservationID, setCancelReservationID }) => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [reservationPage, setReservationPage] = useState(false)

    const [rooms, setRoom] = useState([])
    const [loggedInEmployee, setLoggedInEmployee] = useState()
    const [loggedInEmployeeID, setLoggedInEmployeeID] = useState()

    useEffect(() => {
        fetch('/users')
            .then(res => { return res.json() })
            .then(data => setUsers(data.recordset))
    }, [setUsers])

    const handleLogIn = () => {
        let correctData = false
        users.map(employee => {
            if (email === employee.Emailaddress && password === employee.Employee_Password && !loggedIn) {
                correctData = true
                setLoggedIn(true)
                setLoggedInEmployee(employee.Emailaddress)
                setLoggedInEmployeeID(employee.EmployeeID)
            }
            return employee
        })
        if (!correctData) {
            alert('Email and Password do not match!')
        }
    }

    if (!loggedIn) {
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
                        <button
                            type="submit"
                            className='login'
                            onSubmit={() => { handleLogIn() }}
                        >
                            Log In
                        </button>
                        <button className='signup' onClick={() => { setLogIn(false) }}>Sign up</button>
                    </div>
                </form>
            </>
        )
    }
    if (loggedIn) {
        return (
            <>
                <HomePage
                    email={email}
                    reservationPage={reservationPage}
                    setReservationPage={setReservationPage}
                    rooms={rooms}
                    setRoom={setRoom}
                    users={users}
                    setUsers={setUsers}
                    loggedInEmployee={loggedInEmployee}
                    setLoggedInEmployee={setLoggedInEmployee}
                    loggedInEmployeeID={loggedInEmployeeID}
                    reservations={reservations}
                    setReservations={setReservations}
                    cancelReservationID={cancelReservationID}
                    setCancelReservationID={setCancelReservationID}
                    loggedIn={loggedIn}
                    setLogIn={setLoggedIn}
                />
            </>
        )
    }
}

export default LogInPage
