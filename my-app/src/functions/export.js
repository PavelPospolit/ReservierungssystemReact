import * as XLSX from "xlsx/xlsx.mjs"

export default function handleExport(reservations) {
    const wb = XLSX.utils.book_new(),
        ws = XLSX.utils.json_to_sheet(reservations)

    XLSX.utils.book_append_sheet(wb, ws, 'AllReservations')
    XLSX.writeFile(wb, 'AllReservations.xlsx')
}