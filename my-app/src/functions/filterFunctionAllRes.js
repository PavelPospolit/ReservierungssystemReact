import { format } from "date-fns"
export default function filterFunctionAllRes(filterOption, resFilter, liste) {

    const fitleredList = liste.map((reservation) => {

        let liste
        liste = (
            <tr key={reservation.ReservationID}>
                <td>{reservation.ReservationID}</td>
                <td>{reservation.Roomnumber}</td>
                <td>{format(new Date(reservation.Starting_Date), 'dd.MM.yy, kk:mm') + ' Uhr'}</td>
                <td>{format(new Date(reservation.Ending_Date), 'dd.MM.yy, kk:mm') + ' Uhr'}</td>
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

