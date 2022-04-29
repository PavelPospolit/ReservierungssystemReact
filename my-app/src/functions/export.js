import React from "react";
import * as XLSX from "xlsx/xlsx.mjs"

export default function handleExport(reservations) {
    var wb = XLSX.utils.book_new(),
        ws = XLSX.utils.json_to_sheet(reservations)

    XLSX.utils.book_append_sheet(wb, ws, 'AllReservations')
    XLSX.writeFile(wb, 'AllReservations.xlsx')
}