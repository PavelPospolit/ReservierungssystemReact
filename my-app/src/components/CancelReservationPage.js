import React from 'react'
import HomePage from './HomePage'
import ReservationPage from './ReservationPage'

function CancelReservationPage({ email, reservationPage, setReservationPage, cancelReservationPage,
    setCancelReservationPage, employee, setEmployee, rooms, setRoom, homePage, setHomePage }) {
    if (!homePage && !reservationPage) {
        return (
            <>
                <nav>
                    <h1>Cancel reservation Page</h1>
                    <button className='btn'
                        onClick={() => {
                            setHomePage(true)
                            setCancelReservationPage(false)
                        }}>
                        HomePage
                    </button>
                    <button className='btn'
                        onClick={() => {
                            setReservationPage(true)
                            setCancelReservationPage(false)
                        }}>
                        Reservation
                    </button>
                </nav>
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
                <ReservationPage />
            </>
        )
    }
}

export default CancelReservationPage
