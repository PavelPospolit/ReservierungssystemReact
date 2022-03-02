import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { useNavigate } from 'react-router'


function HomePage({ reservationPage, loggedInEmployee, loggedInEmployeeID, reservations, setReservations,
    cancelReservationID, setCancelReservationID, setLoggedInEmployeeID, setLoggedInEmployee }) {


    const userNameOne = loggedInEmployee.split('@')
    const userName = userNameOne[0].split('.')
    const [emptyState, setEmptyState] = useState()
    const [filterOption, setFilterOption] = useState('')
    const [filterOptionAllRes, setFilterOptionAllRes] = useState('')
    const [filter, setFilter] = useState('')
    const [allResFilter, setAllResFilter] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        fetch('/reservations')
            .then(res => { return res.json() })
            .then(data => setReservations(data.recordset))
    }, [emptyState, setEmptyState, setReservations])

    useEffect(() => {
        if (loggedInEmployee === '') {
            setLoggedInEmployee(localStorage.getItem("email"))
        } if (loggedInEmployeeID === '') {
            setLoggedInEmployeeID(localStorage.getItem("employeeID"))
        }
        if (loggedInEmployee === '' && localStorage.getItem("email") === null) {
            navigate('/')
        } if (loggedInEmployeeID === '' && localStorage.getItem("employeeID") === null) {
            navigate('/')
        }
    }, [loggedInEmployee, loggedInEmployeeID, setLoggedInEmployee, setLoggedInEmployeeID, navigate]);

    const options = [
        { value: 'Everything', label: 'Everything' },
        { value: 'ID', label: 'ID' },
        { value: 'Roomnumber', label: 'Roomnumber' },
        { value: 'Start', label: 'Start' },
        { value: 'End', label: 'End' },
    ]

    const reservationlist = reservations.map((reservation) => {
        let liste
        if (loggedInEmployeeID.toString() === reservation.EmployeeID.toString()) {
            liste = (
                <tr key={reservation.ReservationID} id={reservation.ReservationID}
                    onClick={() => { setCancelReservationID(reservation.ReservationID); let allElements = document.getElementsByClassName('selected'); for (let i = 0; i < allElements.length; i++) { allElements[i].classList.remove('selected'); }; document.getElementById(`${reservation.ReservationID}`).classList.add('selected') }}
                    onMouseOver={() => { let allElements = document.getElementsByClassName('hovered'); for (let i = 0; i < allElements.length; i++) { allElements[i].classList.remove('hovered'); }; document.getElementById(`${reservation.ReservationID}`).classList.add('hovered') }}
                    onMouseOut={() => { let allElements = document.getElementsByClassName('hovered'); for (let i = 0; i < allElements.length; i++) { allElements[i].classList.remove('hovered'); } }}
                    style={{ cursor: 'pointer' }}>
                    <td>{reservation.ReservationID}</td>
                    <td>{reservation.Roomnumber}</td>
                    <td>{reservation.Starting_Date}</td>
                    <td>{reservation.Ending_Date}</td>
                </tr>
            )
            if (((String(reservation.Roomnumber).toLocaleLowerCase().includes(filter.toLocaleLowerCase())) ||
                (String(reservation.ReservationID).toLocaleLowerCase().includes(filter.toLocaleLowerCase())) ||
                (String(reservation.Starting_Date).toLocaleLowerCase().includes(filter.toLocaleLowerCase())) ||
                (String(reservation.Ending_Date).toLocaleLowerCase().includes(filter.toLocaleLowerCase()))) &&
                (filterOption === '' || filterOption === 'Everything')) {
                return liste
            }
            else if ((String(reservation.ReservationID).toLocaleLowerCase().includes(filter.toLocaleLowerCase())) && filterOption === 'ID') {
                return liste
            }
            else if ((String(reservation.Roomnumber).toLocaleLowerCase().includes(filter.toLocaleLowerCase())) && filterOption === 'Roomnumber') {
                return liste
            }
            else if ((String(reservation.Starting_Date).toLocaleLowerCase().includes(filter.toLocaleLowerCase())) && filterOption === 'Start') {
                return liste
            }
            else if ((String(reservation.Ending_Date).toLocaleLowerCase().includes(filter.toLocaleLowerCase())) && filterOption === 'End') {
                return liste
            }
            else if (filter === '') {
                return liste
            }
        }
    })

    const reservationlistAll = reservations.map((reservation) => {
        let liste
        liste = (
            <tr key={reservation.ReservationID}>
                <td>{reservation.ReservationID}</td>
                <td>{reservation.Roomnumber}</td>
                <td>{reservation.Starting_Date}</td>
                <td>{reservation.Ending_Date}</td>
            </tr>
        )
        if (((String(reservation.Roomnumber).toLocaleLowerCase().includes(allResFilter.toLocaleLowerCase())) ||
            (String(reservation.ReservationID).toLocaleLowerCase().includes(allResFilter.toLocaleLowerCase())) ||
            (String(reservation.Starting_Date).toLocaleLowerCase().includes(allResFilter.toLocaleLowerCase())) ||
            (String(reservation.Ending_Date).toLocaleLowerCase().includes(allResFilter.toLocaleLowerCase()))) &&
            (filterOptionAllRes === '' || filterOptionAllRes === 'Everything')) {
            return liste
        }
        else if ((String(reservation.ReservationID).toLocaleLowerCase().includes(allResFilter.toLocaleLowerCase())) && filterOptionAllRes === 'ID') {
            return liste
        }
        else if ((String(reservation.Roomnumber).toLocaleLowerCase().includes(allResFilter.toLocaleLowerCase())) && filterOptionAllRes === 'Roomnumber') {
            return liste
        }
        else if ((String(reservation.Starting_Date).toLocaleLowerCase().includes(allResFilter.toLocaleLowerCase())) && filterOptionAllRes === 'Start') {
            return liste
        }
        else if ((String(reservation.Ending_Date).toLocaleLowerCase().includes(allResFilter.toLocaleLowerCase())) && filterOptionAllRes === 'End') {
            return liste
        }
        else if (allResFilter === '') {
            return liste
        }
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
                <div className='homepageheadlinediv'>
                    <h1>Homepage</h1>
                    <h2>Lgged in user: {`${userName}`}</h2>
                </div>
                <nav>
                    <button className='changeview'
                        onClick={() => {
                            setFilter('')
                            setFilterOption('')
                            setAllResFilter('')
                            setFilterOptionAllRes('')
                            navigate('/Reservation')
                        }} >
                        reserve a room
                    </button>
                    <button className='logout' onClick={() => {
                        navigate('/')
                        setLoggedInEmployeeID('')
                        setLoggedInEmployee('')
                        localStorage.removeItem("email")
                        localStorage.removeItem("employeeID")
                        localStorage.removeItem("employeeID")
                    }}>log out</button>
                </nav>

                <div>
                    <h2>All reservations:</h2>
                    <div className='filterdiv'>
                        <Select options={options} onChange={(values) => setFilterOptionAllRes(values.value)} />
                        <input type="text" placeholder='Search through all reservations!' className='filterInputHomePage' onChange={(e) => { setAllResFilter(e.target.value) }} />
                    </div>
                    <span>
                        <table>
                            <thead>
                                <tr>
                                    <th>Reservation ID</th>
                                    <th>Room number</th>
                                    <th>Start</th>
                                    <th>End</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reservationlistAll}
                            </tbody>
                        </table>
                        <br />
                    </span>
                </div>

                <div className='reservations'>
                    <h2>Your reservations:</h2>
                    <div className='filterdiv'>
                        <Select options={options} onChange={(values) => setFilterOption(values.value)} />
                        <input type="text" placeholder='Search through your reservations!' className='filterInputHomePage' onChange={(e) => { setFilter(e.target.value) }} />
                    </div>
                    <span>
                        <table>
                            <thead>
                                <tr>
                                    <th>Reservation ID</th>
                                    <th>Room number</th>
                                    <th>Start</th>
                                    <th>End</th>
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
}
export default HomePage