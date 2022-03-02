import React, { useState, useEffect } from 'react'
import LogInPage from './LogInPage'
import RegisterPage from './RegisterPage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './HomePage'
import ReservationPage from './ReservationPage'

const StartingPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [reservations, setReservations] = useState([])
    const [cancelReservationID, setCancelReservationID] = useState('')
    const [reservationPage, setReservationPage] = useState(false)
    const [rooms, setRoom] = useState([])
    const [loggedInEmployee, setLoggedInEmployee] = useState('')
    const [loggedInEmployeeID, setLoggedInEmployeeID] = useState('')
    const [loggedIn, setLoggedIn] = useState(false)

    const [startTime, setStartTime] = useState(new Date())
    const [formattedStartTime, setFormattedStartTime] = useState()
    const [endTime, setEndTime] = useState(new Date())
    const [formattedEndTime, setFormattedEndTime] = useState()


    useEffect(() => {
        fetch('/reservations')
            .then(res => { return res.json() })
            .then(data => setReservations(data.recordset))
    }, [])


    return (
        <Router>
            <Routes>
                <Route path='/' element={
                    <LogInPage
                        setLoggedInEmployeeID={setLoggedInEmployeeID}
                        loggedInEmployeeID={loggedInEmployeeID}
                        setLoggedInEmployee={setLoggedInEmployee}
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        reservations={reservations}
                        setReservations={setReservations}
                        cancelReservationID={cancelReservationID}
                        setCancelReservationID={setCancelReservationID}

                    />
                } />
                <Route path='/register' element={
                    <RegisterPage
                        loggedInEmployeeID={loggedInEmployeeID}
                        setLoggedInEmployee={setLoggedInEmployee}
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        repeatPassword={repeatPassword}
                        setRepeatPassword={setRepeatPassword}
                    />
                } />
                <Route path='/Homepage' element={
                    <HomePage
                        email={email}
                        reservationPage={reservationPage}
                        setReservationPage={setReservationPage}
                        rooms={rooms}
                        setRoom={setRoom}
                        loggedInEmployee={loggedInEmployee}
                        setLoggedInEmployee={setLoggedInEmployee}
                        loggedInEmployeeID={loggedInEmployeeID}
                        reservations={reservations}
                        setReservations={setReservations}
                        cancelReservationID={cancelReservationID}
                        setCancelReservationID={setCancelReservationID}
                        loggedIn={loggedIn}
                        setLogIn={setLoggedIn}
                        setLoggedInEmployeeID={setLoggedInEmployeeID}
                        startTime={startTime}
                        setStartTime={startTime}
                        formattedStartTime={formattedStartTime}
                        setFormattedStartTime={setFormattedStartTime}
                        endTime={endTime}
                        setEndTime={setEndTime}
                    />
                }
                />
                <Route path='/Reservation' element={
                    <ReservationPage
                        email={email}
                        reservationPage={reservationPage}
                        setReservationPage={setReservationPage}
                        rooms={rooms}
                        setRoom={setRoom}
                        startTime={startTime}
                        setStartTime={setStartTime}
                        formattedStartTime={formattedStartTime}
                        setFormattedStartTime={setFormattedStartTime}
                        endTime={endTime}
                        setEndTime={setEndTime}
                        formattedEndTime={formattedEndTime}
                        setFormattedEndTime={setFormattedEndTime}
                        loggedInEmployee={loggedInEmployee}
                        loggedInEmployeeID={loggedInEmployeeID}
                        reservations={reservations}
                        setReservations={setReservations}
                    />
                } />
            </Routes>
        </Router>
    )
}
export default StartingPage
