import React, { useEffect, useState } from 'react'
import HomePage from './HomePage'
import CancelReservationPage from './CancelReservationPage'
import DateTimePicker from 'react-datetime-picker'
import { format } from "date-fns"

function ReservationPage({ email, reservationPage, setReservationPage, cancelReservationPage,
    setCancelReservationPage, employee, setEmployee, rooms, setRoom, homePage, setHomePage, loggedInEmployeeID,
    startTime, setStartTime, formattedStartTime, setFormattedStartTime, endTime, setEndTime, formattedEndTime, setFormattedEndTime, reservations, setReservations }) {

    const [roomnumber, setRoomnumber] = useState()
    const [reservationID, setReservationID] = useState(0)

    useEffect(() => {
        fetch('/rooms')
            .then(res => { return res.json() })
            .then(data => setRoom(data.recordset))
    }, [setRoom])

    useEffect(() => {
        reservations.map((reservation) => {
            if (reservationID <= reservation.ReservationID) {
                setReservationID(reservation.ReservationID + 1)
                console.log(reservationID);
            }
            return reservationID
        })
    }, [roomnumber, startTime, endTime])




    const roomlist = rooms.map((room) =>
        <tr key={room.Roomnumber}>
            <td onClick={() => { setRoomnumber(room.Roomnumber) }} style={{ cursor: 'pointer' }}>{room.Roomnumber}</td>
            <td onClick={() => { setRoomnumber(room.Roomnumber) }} style={{ cursor: 'pointer' }}>{room.Roomdescritpion}</td>
            <td onClick={() => { setRoomnumber(room.Roomnumber) }} style={{ cursor: 'pointer' }}>{room.Roomspecials}</td>
            <td onClick={() => { setRoomnumber(room.Roomnumber) }} style={{ cursor: 'pointer' }}>{room.Roomcapacity}</td>
        </tr>
    )
    useEffect(() => {
        setFormattedStartTime(format(startTime, 'yyyy-MM-dd kk:mm'))
        setFormattedEndTime(format(endTime, 'yyyy-MM-dd kk:mm'))
    }, [startTime, endTime])

    const handleReservation = () => {
        (async () => {
            try {
                await fetch('/addReservation', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        reservationID: reservationID, employeeID: loggedInEmployeeID, roomnumber: roomnumber,
                        startingDate: formattedStartTime, endingDate: formattedEndTime
                    })
                })
                    .then(await fetch('/reservations')
                        .then(res => { return res.json() })
                        .then(data => setReservations(data.recordset)))
                    .then(alert(`Reservation of Room ${roomnumber} has been reserved successfully from ${formattedStartTime} untill ${formattedEndTime}.`))
            }
            catch (err) {
                console.log(err);
            }
        })()
    }



    if (!homePage && !cancelReservationPage) {
        return (
            <>
                <nav>
                    <h1>reservation Page</h1>
                    <button className='btn'
                        onClick={() => {
                            setHomePage(true)
                            setReservationPage(false)
                        }}>
                        HomePage
                    </button>
                    <button className='btn'
                        onClick={() => {
                            setCancelReservationPage(true)
                            setReservationPage(false)
                        }}>
                        Cancel Reservation
                    </button>
                </nav>
                <div>
                    <label>Start</label>
                    <DateTimePicker minDate={new Date()} onChange={setStartTime} value={startTime} />
                    <label>End</label>
                    <DateTimePicker minDate={startTime} onChange={setEndTime} value={endTime} />
                    <label> ROOM: {roomnumber}</label>
                    <button onClick={() => {
                        console.log('starttime ' + formattedStartTime)
                        console.log('endtime ' + formattedEndTime)
                        if (startTime.getTime() < endTime.getTime()) {
                            console.log('biig');
                        }
                        if (startTime.getTime() === endTime.getTime()) {
                            console.log('equality')
                        }
                    }}>
                        click me aswell
                    </button>
                    <button onClick={() => { handleReservation() }} style={{ cursor: 'pointer' }} className='btn'>reserve Room!</button>
                    <span>
                        <table>
                            <thead>
                                <tr>
                                    <th>Room number</th>
                                    <th>Room description</th>
                                    <th>Room specials</th>
                                    <th>Room capacity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {roomlist}
                            </tbody>
                        </table>
                    </span>
                </div>
            </>
        )
    }
    if (homePage && !reservationPage) {
        return (
            <>
                <HomePage />
            </>)
    }
    if (!homePage && reservationPage) {
        return (
            <>
                <CancelReservationPage />
            </>
        )
    }
}

export default ReservationPage