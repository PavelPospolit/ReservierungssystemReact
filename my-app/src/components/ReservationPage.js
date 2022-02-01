import React, { useEffect, useState } from 'react'
import HomePage from './HomePage'
import DateTimePicker from 'react-datetime-picker'
import { format } from "date-fns"

function ReservationPage({ email, reservationPage, setReservationPage,
    employee, setEmployee, rooms, setRoom, homePage, setHomePage, loggedInEmployeeID,
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
            }
            return reservationID
        })
    }, [roomnumber, startTime, endTime, reservationID, reservations])




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
    }, [startTime, endTime, setFormattedEndTime, setFormattedStartTime])






    const handleReservation = () => {

        let startCheck = true
        let endCheck = true

        reservations.map(reservation => {
            let fetchedStartDate = new Date(reservation.Starting_Date)
            let fetchedEndDate = new Date(reservation.Ending_Date)
            if (reservation.Roomnumber === roomnumber &&
                (fetchedEndDate.getTime() >= endTime.getTime() &&
                    fetchedStartDate.getTime() <= endTime.getTime())) {
                endCheck = false
            }
            if (reservation.Roomnumber === roomnumber &&
                (fetchedStartDate.getTime() <= startTime.getTime() &&
                    fetchedEndDate.getTime() >= startTime.getTime())) {
                startCheck = false
            }
            return (endCheck, startCheck)
        })
        if (!endCheck) {
            alert(`Room ${roomnumber} is not free on ${formattedEndTime}`)
        }
        else if (!startCheck) {
            alert(`Room ${roomnumber} is not free on ${formattedStartTime}`)
        }
        else if (startCheck && endCheck) {
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
            setRoomnumber('')
        }
    }



    if (!homePage) {
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
                </nav>
                <div>
                    <label>Start</label>
                    <DateTimePicker minDate={new Date()} onChange={setStartTime} value={startTime} />
                    <label>End</label>
                    <DateTimePicker minDate={startTime} onChange={setEndTime} value={endTime} />
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
                    <label> ROOM: {roomnumber}</label>
                    <br />
                    <button onClick={() => { handleReservation() }} style={{ cursor: 'pointer' }} className='btn'>reserve Room!</button>
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
}

export default ReservationPage