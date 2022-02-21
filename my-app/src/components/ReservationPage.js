import React, { useEffect, useState } from 'react'
import HomePage from './HomePage'
import DateTimePicker from 'react-datetime-picker'
import { format } from "date-fns"
import Select from 'react-select'
import 'react-dropdown/style.css'

function ReservationPage({ email, reservationPage, setReservationPage,
    employee, setEmployee, rooms, setRoom, homePage, setHomePage, loggedInEmployeeID,
    startTime, setStartTime, formattedStartTime, setFormattedStartTime, endTime, setEndTime, formattedEndTime,
    setFormattedEndTime, reservations, setReservations }) {

    const [roomnumber, setRoomnumber] = useState('')
    const [filterOption, setFilterOption] = useState('')
    const [filter, setFilter] = useState('')

    useEffect(() => {
        fetch('/rooms')
            .then(res => { return res.json() })
            .then(data => setRoom(data.recordset))
    }, [setRoom])


    let roomlist = rooms.map((room) => {
        const liste = (
            <tr key={room.Roomnumber} id={room.Roomnumber}
                onClick={() => { setRoomnumber(room.Roomnumber); let allElements = document.getElementsByClassName('selected'); for (let i = 0; i < allElements.length; i++) { allElements[i].classList.remove('selected'); }; document.getElementById(`${room.Roomnumber}`).classList.add('selected') }}
                onMouseOver={() => { let allElements = document.getElementsByClassName('hovered'); for (let i = 0; i < allElements.length; i++) { allElements[i].classList.remove('hovered'); }; document.getElementById(`${room.Roomnumber}`).classList.add('hovered') }}
                onMouseOut={() => { let allElements = document.getElementsByClassName('hovered'); for (let i = 0; i < allElements.length; i++) { allElements[i].classList.remove('hovered'); } }}
                style={{ cursor: 'pointer' }}>
                <td>{room.Roomnumber}</td>
                <td>{room.Roomdescritpion}</td>
                <td>{room.Roomspecials}</td>
                <td>{room.Roomcapacity}</td>
            </tr>
        )
        if (((room.Roomspecials.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
            room.Roomdescritpion.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
            String(room.Roomnumber).toLocaleLowerCase().includes(filter.toLocaleLowerCase()))) &&
            (filterOption === 'Everything' || filterOption === '')) {
            return liste
        }
        else if (room.Roomspecials.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) && filterOption === 'Properties') {
            return liste
        }
        else if (room.Roomdescritpion.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) && filterOption === 'Description') {
            return liste
        }
        else if (String(room.Roomnumber).toLocaleLowerCase().includes(filter.toLocaleLowerCase()) && filterOption === 'Roomnumber') {
            return liste
        }
        else if (filter === '') {
            return liste
        }
    }
    )
    useEffect(() => {
        setFormattedStartTime(format(startTime, 'yyyy-MM-dd kk:mm'))
        setFormattedEndTime(format(endTime, 'yyyy-MM-dd kk:mm'))
    }, [startTime, endTime, setFormattedEndTime, setFormattedStartTime])


    const options = [
        { value: 'Everything', label: 'Everything' },
        { value: 'Roomnumber', label: 'Roomnumber' },
        { value: 'Description', label: 'Description' },
        { value: 'Properties', label: 'Properties' },
    ]




    const handleReservation = () => {

        let startCheck = true
        let endCheck = true

        if (roomnumber === '') {
            alert('please select a room!')
        }
        else {
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
                alert(`Room ${roomnumber} is not free on ${formattedEndTime}! Check availability in the Homepage tab.`)
            }
            else if (!startCheck) {
                alert(`Room ${roomnumber} is not free on ${formattedStartTime}! Check availability in the Homepage tab.`)
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
                                employeeID: loggedInEmployeeID, roomnumber: roomnumber,
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
        }
    }



    if (!homePage) {
        return (
            <>
                <h1>Reservation page</h1>
                <nav>
                    <button className='changeview'
                        onClick={() => {
                            setHomePage(true)
                            setReservationPage(false)
                            setFilter('')
                            setFilterOption('')
                        }}>
                        HomePage
                    </button>
                </nav>
                <div className='filterdiv'>
                    <Select options={options} onChange={(values) => setFilterOption(values.value)} />
                    <input type="text" placeholder='Search for something. Select DropDown property to specify your search!' className='filterInput' onChange={(e) => { setFilter(e.target.value) }} />
                </div>
                <div className='datetimepickerlabels'>
                    <label>Start:</label>
                    <label className='endlabel'>End:</label>
                </div>
                <div className='datetimepickerdiv'>
                    <DateTimePicker clearIcon={null} calendarIcon={null} className='datetimepicker' minDate={new Date()} onChange={setStartTime} value={startTime} />
                    <DateTimePicker clearIcon={null} calendarIcon={null} className='datetimepicker' minDate={startTime} onChange={setEndTime} value={endTime} />
                </div>
                <div>
                    <span>
                        <table>
                            <thead>
                                <tr>
                                    <th>Room number</th>
                                    <th>Room description</th>
                                    <th>Room properties</th>
                                    <th>Room capacity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {roomlist}
                            </tbody>
                        </table>
                    </span>
                    <br />
                    <button onClick={() => { handleReservation() }} style={{ cursor: 'pointer' }} className='signup'>Reserve room!</button>
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