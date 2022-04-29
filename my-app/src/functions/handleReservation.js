import format from "date-fns/format"
export default function handleReservation(reservations, roomnumber, formattedStartTime, formattedEndTime, endTime, startTime, loggedInEmployeeID, setReservations, setRoomnumber) {

    let startCheck = true
    let endCheck = true
    let timeCheck = true

    if (roomnumber === '') {
        alert('Please select a room!')
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
            if (endTime.getTime() <= startTime.getTime() || endTime.getTime() === startTime.getTime() || endTime.getTime() <= new Date().getTime()) {
                timeCheck = false
            }
            return (endCheck, startCheck, timeCheck)
        })
        if (!endCheck) {
            alert(`Room ${roomnumber} is not free on ${format(new Date(formattedEndTime), 'dd.MM.yy, kk:mm')}! Check availability in the Homepage tab.`)
        }
        else if (!startCheck) {
            alert(`Room ${roomnumber} is not free on ${format(new Date(formattedStartTime), 'dd.MM.yy, kk:mm')}! Check availability in the Homepage tab.`)
        }
        else if (!timeCheck) {
            alert('Ending time cannot be earlier than or identical to starting time')
        }
        else if (startCheck && endCheck && timeCheck) {
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
                        .then(alert(`Room ${roomnumber} has been reserved successfully from ${format(new Date(formattedStartTime), 'dd.MM.yy, kk:mm')} untill ${format(new Date(formattedEndTime), 'dd.MM.yy, kk:mm')}.`))

                }
                catch (err) {
                    console.log(err);
                }
            })()
        }
        (() => {
            let allElements_hovered = document.getElementsByClassName('hovered'); for (let i = 0; i < allElements_hovered.length; i++) { allElements_hovered[i].classList.remove('hovered'); }
            let allElements_selected = document.getElementsByClassName('selected'); for (let i = 0; i < allElements_selected.length; i++) { allElements_selected[i].classList.remove('selected'); }
        })()
        setRoomnumber('')
    }
}
