import React from "react";
import { format } from "date-fns"
export default function filterFunction(filterOption, resFilter, liste, setCancelReservationID, loggedInEmployeeID) {

    const fitleredList = liste.map((reservation) => {

        let liste

        if (reservation.EmployeeID.toString() === loggedInEmployeeID.toString()) {
            liste = (
                <tr
                    key={reservation.ReservationID}
                    id={reservation.ReservationID}
                    onClick={() => { setCancelReservationID(reservation.ReservationID); let allElements = document.getElementsByClassName('selected'); for (let i = 0; i < allElements.length; i++) { allElements[i].classList.remove('selected'); }; document.getElementById(`${reservation.ReservationID}`).classList.add('selected') }}
                    onMouseOver={() => { let allElements = document.getElementsByClassName('hovered'); for (let i = 0; i < allElements.length; i++) { if (allElements[i].getElementsByClassName('hovered')) { allElements[i].classList.remove('hovered'); } }; document.getElementById(`${reservation.ReservationID}`).classList.add('hovered') }}
                    onMouseOut={() => { let allElements = document.getElementsByClassName('hovered'); for (let i = 0; i < allElements.length; i++) { allElements[i].classList.remove('hovered'); } }}
                    style={{ cursor: 'pointer' }}
                >
                    <td>{reservation.ReservationID}</td>
                    <td>{reservation.Roomnumber}</td>
                    <td>{format(new Date(reservation.Starting_Date), 'dd.MM.yy, kk:mm') + ' Uhr'}</td>
                    <td>{format(new Date(reservation.Ending_Date), 'dd.MM.yy, kk:mm') + ' Uhr'}</td>
                </tr>
            )
        }

        if (((String(reservation.Roomnumber).toLocaleLowerCase().includes(resFilter.toLocaleLowerCase())) ||
            (String(reservation.ReservationID).toLocaleLowerCase().includes(resFilter.toLocaleLowerCase())) ||
            (String(reservation.Starting_Date).toLocaleLowerCase().includes(resFilter.toLocaleLowerCase())) ||
            (String(reservation.Ending_Date).toLocaleLowerCase().includes(resFilter.toLocaleLowerCase()))) &&
            (filterOption === '' || filterOption === 'Everything')) {
            return liste
        }
        else if ((String(reservation.ReservationID).toLocaleLowerCase().includes(resFilter.toLocaleLowerCase())) && filterOption === 'ID') {
            return liste
        }
        else if ((String(reservation.Roomnumber).toLocaleLowerCase().includes(resFilter.toLocaleLowerCase())) && filterOption === 'Roomnumber') {
            return liste
        }
        else if ((String(reservation.Starting_Date).toLocaleLowerCase().includes(resFilter.toLocaleLowerCase())) && filterOption === 'Start') {
            return liste
        }
        else if ((String(reservation.Ending_Date).toLocaleLowerCase().includes(resFilter.toLocaleLowerCase())) && filterOption === 'End') {
            return liste
        }
        else if (resFilter === '') {
            return liste
        }
    })
    return (fitleredList)

}