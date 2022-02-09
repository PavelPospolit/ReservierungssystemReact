import React, { useEffect, useState } from 'react'
import ReservationPage from './ReservationPage'

function HomePage({ email, reservationPage, setReservationPage,
    employee, setEmployee, rooms, setRoom, loggedInEmployee, loggedInEmployeeID, reservations, setReservations,
    cancelReservationID, setCancelReservationID }) {
    const [homePage, setHomePage] = useState(false)

    const userNameOne = loggedInEmployee.split('@')
    const userName = userNameOne[0].split('.')
    const [startTime, setStartTime] = useState(new Date())
    const [formattedStartTime, setFormattedStartTime] = useState()
    const [endTime, setEndTime] = useState(new Date())
    const [formattedEndTime, setFormattedEndTime] = useState()
    const [emptyState, setEmptyState] = useState()

    useEffect(() => {
        fetch('/reservations')
            .then(res => { return res.json() })
            .then(data => setReservations(data.recordset))
    }, [emptyState, setEmptyState])


    const reservationlist = reservations.map((reservation) => {
        let liste
        if (loggedInEmployeeID.toString() === reservation.EmployeeID.toString()) {
            liste = (<tr key={reservation.ReservationID} id={reservation.ReservationID} onClick={() => { setCancelReservationID(reservation.ReservationID); let allElements = document.getElementsByClassName('selected'); for (let i = 0; i < allElements.length; i++) { allElements[i].classList.remove('selected'); }; document.getElementById(`${reservation.ReservationID}`).classList.add('selected') }} style={{ cursor: 'pointer' }}>
                <td>{reservation.ReservationID}</td>
                <td>{reservation.Roomnumber}</td>
                <td>{reservation.Starting_Date}</td>
                <td>{reservation.Ending_Date}</td>
            </tr>)
        }
        return liste
    })

    const handleCancel = () => {
        if (cancelReservationID === '') {
            alert('Please select a reservation to cancel')
        }
        else {
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
                        .then(setEmptyState({}))
                }
                catch (err) {
                    console.log(err);
                }
            })()
            setCancelReservationID('')
        }
    }


    if (!reservationPage) {
        return (
            <>
                <h1>LOGGED IN as {`${userName}`}</h1>
                <nav>
                    <button className='changeview'
                        onClick={() => {
                            setHomePage(false)
                            setReservationPage(true)
                        }} >
                        reserve a room
                    </button>
                    <button className='logout' onClick={() => { window.location.reload(false) }}>log out</button>
                </nav>
                <div className='reservations'>
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
                    <br />
                    <button className='signup' onClick={() => { handleCancel() }}>cancel selected reservation</button>
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