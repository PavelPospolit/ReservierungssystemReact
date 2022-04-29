import React from "react";
export default function filterFunction(filterOption, resFilter, liste, setCancelReservationID) {

    const fitleredList = liste.map((reservation) => {
        let liste
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
                <td>{reservation.Starting_Date}</td>
                <td>{reservation.Ending_Date}</td>
            </tr>
        )


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