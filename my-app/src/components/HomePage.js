import React, { useState } from 'react'
import ReservationPage from './ReservationPage'
import CancelReservationPage from './CancelReservationPage'
import format from 'date-fns/format'

function HomePage({ email, reservationPage, setReservationPage, cancelReservationPage, setCancelReservationPage,
    employee, setEmployee, rooms, setRoom, users, setUsers, loggedInEmployee, setLoggedInEmployee, loggedInEmployeeID, reservations, setReservations }) {
    const [homePage, setHomePage] = useState(false)

    const userNameOne = loggedInEmployee.split('@')
    const userName = userNameOne[0].split('.')
    const [startTime, setStartTime] = useState(new Date())
    const [formattedStartTime, setFormattedStartTime] = useState()
    const [endTime, setEndTime] = useState(new Date())
    const [formattedEndTime, setFormattedEndTime] = useState()

    if (!reservationPage && !cancelReservationPage) {
        return (
            <>
                <nav>
                    <h1>LOGGED IN as {`${userName}`}</h1>
                    <button className='btn'
                        onClick={() => {
                            setReservationPage(true)
                            setHomePage(false)
                        }} >
                        reserve a room
                    </button>
                    <button className='btn'
                        onClick={() => {
                            setCancelReservationPage(true)
                            setHomePage(false)
                        }} >
                        cancel reservation
                    </button>
                </nav>
            </>
        )
    }
    if (reservationPage && !cancelReservationPage) {
        return (
            <ReservationPage
                email={email}
                reservationPage={reservationPage}
                setReservationPage={setReservationPage}
                cancelReservationPage={cancelReservationPage}
                setCancelReservationPage={setCancelReservationPage}
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
    if (!reservationPage && cancelReservationPage) {
        return (
            <CancelReservationPage
                email={email}
                reservationPage={reservationPage}
                setReservationPage={setReservationPage}
                cancelReservationPage={cancelReservationPage}
                setCancelReservationPage={setCancelReservationPage}
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
