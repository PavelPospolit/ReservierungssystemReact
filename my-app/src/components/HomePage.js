import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { useNavigate } from 'react-router'
import filterFunction from '../functions/filterFunction'
import filterFunctionAllRes from '../functions/filterFunctionAllRes'
import handleCancel from '../functions/handleCancel'

function HomePage({ loggedInEmployee, loggedInEmployeeID, reservations, setReservations,
    cancelReservationID, setCancelReservationID, setLoggedInEmployeeID, setLoggedInEmployee }) {

    const userNameOne = loggedInEmployee.split('@')
    const userName = userNameOne[0].split('.')
    const [emptyState, setEmptyState] = useState()
    const [filterOption, setFilterOption] = useState('')
    const [filterOptionAllRes, setFilterOptionAllRes] = useState('')
    const [filter, setFilter] = useState('')
    const [allResFilter, setAllResFilter] = useState('')
    const navigate = useNavigate()
    let greeting



    useEffect(() => {
        fetch('/reservations')
            .then(res => { return res.json() })
            .then(data => setReservations(data.recordset))
    }, [emptyState, setEmptyState, setReservations])

    useEffect(() => {
        if (loggedInEmployee === '') {
            setLoggedInEmployee(localStorage.getItem("email"))
        }
        if (loggedInEmployeeID === '') {
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
    ];

    (() => {
        greeting = ''
        for (let i = 0; i < userName.length; i++) {
            greeting += ` ${userName[i].charAt(0).toUpperCase() + userName[i].slice(1)}`
        }
    })()

    return (
        <>
            <div className='homepageheadlinediv'>
                <h1>Homepage</h1>
                <h2>Logged in user: {greeting}</h2>
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
                    Reserve a room
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
                    <Select options={options} onChange={(values) => setFilterOptionAllRes(values.value)} placeholder='Specify Search' />
                    <input type="text" placeholder='Search through all reservations! Select DropDown property to specify your search!' className='filterInputHomePage' onChange={(e) => { setAllResFilter(e.target.value) }} />
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
                            {filterFunctionAllRes(filterOptionAllRes, allResFilter, reservations)}
                        </tbody>
                    </table>
                    <br />
                </span>
            </div>

            <div className='reservations'>
                <h2>Your reservations:</h2>
                <div className='filterdiv'>
                    <Select options={options} onChange={(values) => setFilterOption(values.value)} placeholder='Specify Search' />
                    <input type="text" placeholder='Search through your reservations! Select DropDown property to specify your search!' className='filterInputHomePage' onChange={(e) => { setFilter(e.target.value) }} />
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
                            {filterFunction(filterOption, filter, reservations, setCancelReservationID)}
                        </tbody>
                    </table>
                </span>
                <br />
                <button className='signup' onClick={() => { handleCancel(cancelReservationID, setReservations, setEmptyState, setCancelReservationID) }}>Cancel reservation!</button>
            </div>
        </>
    )
}
export default HomePage