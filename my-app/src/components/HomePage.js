import React, { useState } from 'react'
import ReservationPage from './ReservationPage'

function HomePage({ email, reservationPage, setReservationPage,
    employee, setEmployee, rooms, setRoom, users, setUsers, loggedInEmployee, setLoggedInEmployee, loggedInEmployeeID, reservations, setReservations,
    cancelReservationID, setCancelReservationID }) {
    const [homePage, setHomePage] = useState(false)

    const userNameOne = loggedInEmployee.split('@')
    const userName = userNameOne[0].split('.')
    const [startTime, setStartTime] = useState(new Date())
    const [formattedStartTime, setFormattedStartTime] = useState()
    const [endTime, setEndTime] = useState(new Date())
    const [formattedEndTime, setFormattedEndTime] = useState()

    const reservationlist = reservations.map((reservation) => {
        let liste
        if (loggedInEmployeeID.toString() === reservation.EmployeeID.toString()) {
            liste = (<tr key={reservation.ReservationID}>
                <td onClick={() => { setCancelReservationID(reservation.ReservationID) }} style={{ cursor: 'pointer' }}>{reservation.ReservationID}</td>
                <td onClick={() => { setCancelReservationID(reservation.ReservationID) }} style={{ cursor: 'pointer' }}>{reservation.Roomnumber}</td>
                <td onClick={() => { setCancelReservationID(reservation.ReservationID) }} style={{ cursor: 'pointer' }}>{reservation.Starting_Date}</td>
                <td onClick={() => { setCancelReservationID(reservation.ReservationID) }} style={{ cursor: 'pointer' }}>{reservation.Ending_Date}</td>
            </tr>)
        }
        return liste
    })

    const handleCancel = () => {
        (async () => {
            try {
                await fetch('/cancelReservation', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        ReservationID: cancelReservationID
                    })
                })
                    .then(await fetch('/reservations')
                        .then(res => { return res.json() })
                        .then(data => setReservations(data.recordset)))
                    .then(alert(`Reservation ${cancelReservationID} has been cacnelled successfully.`))
            }
            catch (err) {
                console.log(err);
            }
        })()
        setCancelReservationID('')
    }


    if (!reservationPage) {
        return (
            <>
                <nav>
                    <h1>LOGGED IN as {`${userName}`}</h1>
                    <button className='btn'
                        onClick={() => {
                            setHomePage(false)
                            setReservationPage(true)
                        }} >
                        reserve a room
                    </button>
                </nav>
                <div>
                    <h2>Your reservations:</h2>
                    <span>
                        <table>
                            <thead>
                                <tr>
                                    <th>ReservationID</th>
                                    <th>Room number</th>
                                    <th>starting date</th>
                                    <th>ending date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reservationlist}
                            </tbody>
                        </table>
                    </span>
                    <label>selected reservation: {cancelReservationID}</label>
                    <br />
                    <button className='btn' onClick={() => { handleCancel() }}>cancel selected reservation</button>
                </div>
            </>
        )
    }
    if (reservationPage) {
        return (
            <ReservationPage
                email={email}
                reservationPage={reservationPage}
                setReservationPage={setReservationPage}
                employee={employee}
                setEmployee={setEmployee}
                rooms={rooms}
                setRoom={setRoom}
                homePage={homePage}
                setHomePage={setHomePage}
                startTime={startTime}
                setStartTime={setStartTime}
                formattedStartTime={formattedStartTime}
                setFormattedStartTime={setFormattedStartTime}
                endTime={endTime}
                setEndTime={setEndTime}
                formattedEndTime={formattedEndTime}
                setFormattedEndTime={setFormattedEndTime}
                loggedInEmployeeID={loggedInEmployeeID}
                reservations={reservations}
                setReservations={setReservations}
            />
        )
    }
}
export default HomePage
