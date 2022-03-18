export default function filterFunctionAllRes(filterOption, resFilter, liste) {

    const fitleredList = liste.map((reservation) => {
        let liste
        liste = (
            <tr key={reservation.ReservationID}>
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

