import React, { useEffect, useState } from 'react'
import DateTimePicker from 'react-datetime-picker'
import { format } from "date-fns"
import Select from 'react-select'
import 'react-dropdown/style.css'
import { useNavigate } from 'react-router'
import filterFunctionResPage from '../functions/filterFunctionResPage'
import handleReservation from '../functions/handleReservation'

function ReservationPage({ rooms, setRoom, loggedInEmployeeID,
    startTime, setStartTime, formattedStartTime, setFormattedStartTime, endTime, setEndTime, formattedEndTime,
    setFormattedEndTime, reservations, setReservations, loggedInEmployee }) {

    const [roomnumber, setRoomnumber] = useState('')
    const [filterOption, setFilterOption] = useState('')
    const [filter, setFilter] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        fetch('/rooms')
            .then(res => { return res.json() })
            .then(data => setRoom(data.recordset))
    }, [setRoom])

    useEffect(() => {
        if (loggedInEmployee === '' && localStorage.getItem("email") === null) {
            navigate('/')
        } if (loggedInEmployeeID === '' && localStorage.getItem("employeeID") === null) {
            navigate('/')
        }
    }, [loggedInEmployee, loggedInEmployeeID, navigate]);

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



    return (
        <>
            <h1>Reservation page</h1>
            <nav>
                <button className='changeview'
                    onClick={() => {
                        setFilter('')
                        setFilterOption('')
                        navigate('/Homepage')
                    }}>
                    HomePage
                </button>
            </nav>
            <div className='filterdiv'>
                <Select options={options} onChange={(values) => setFilterOption(values.value)} placeholder='Specify Search' />
                <input type="text" placeholder='Search for something. Select DropDown property to specify your search!' className='filterInput' onChange={(e) => { setFilter(e.target.value) }} />
            </div>
            <div className='datetimepickerlabels'>
                <label className='startlabel'>Start:</label>
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
                            {filterFunctionResPage(filterOption, filter, rooms, setRoomnumber)}
                        </tbody>
                    </table>
                </span>
                <br />
                <button onClick={() => { handleReservation(reservations, roomnumber, formattedStartTime, formattedEndTime, endTime, startTime, loggedInEmployeeID, setReservations) }} style={{ cursor: 'pointer' }} className='signup'>Reserve room!</button>
            </div>
        </>
    )
}

export default ReservationPage