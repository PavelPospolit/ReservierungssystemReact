import React, { useState, useEffect } from 'react'
import LogInPage from './LogInPage'
import RegisterPage from './RegisterPage'

const StartingPage = ({ logIn, setLogIn }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [addedUser, setaddedUser] = useState('')
    const [users, setUsers] = useState([])
    const [reservations, setReservations] = useState([])
    const [cancelReservationID, setCancelReservationID] = useState()



    useEffect(() => {
        fetch('/users')
            .then(res => { return res.json() })
            .then(data => setUsers(data.recordset))
    }, [])
    useEffect(() => {
        fetch('/reservations')
            .then(res => { return res.json() })
            .then(data => setReservations(data.recordset))
    }, [])



    if (logIn) {
        return (
            <>
                <LogInPage
                    logIn={logIn}
                    setLogIn={setLogIn}
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    users={users}
                    setUsers={setUsers}
                    reservations={reservations}
                    setReservations={setReservations}
                    cancelReservationID={cancelReservationID}
                    setCancelReservationID={setCancelReservationID}
                />
            </>
        )
    }
    if (!logIn) {
        return (
            <>
                <RegisterPage
                    logIn={logIn}
                    setLogIn={setLogIn}
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    repeatPassword={repeatPassword}
                    setRepeatPassword={setRepeatPassword}
                    users={users}
                    setUsers={setUsers}
                    addedUser={addedUser}
                    setaddedUser={setaddedUser}
                />
            </>
        )
    }
}
export default StartingPage
