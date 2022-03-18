export default function handleReservation(reservations, roomnumber, formattedStartTime, formattedEndTime, endTime, startTime, loggedInEmployeeID, setReservations) {

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
