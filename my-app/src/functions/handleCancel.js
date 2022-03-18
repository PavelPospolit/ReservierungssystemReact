export default function handleCancel(cancelReservationID, setReservations, setEmptyState, setCancelReservationID) {
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
                        .then((data) => { setReservations(data.recordset) })
                    )
                    .then(alert(`Reservation ${cancelReservationID} has been cancelled successfully.`))
                    .then(setCancelReservationID(''))
                    .then(setEmptyState({}))
            }
            catch (err) {
                console.log(err);
            }
        })()
    }
}