export default function filterFunctionResPage(filterOption, resFilter, liste, setRoomnumber) {

    const filteredList = liste.map((room) => {

        const liste = (
            <tr key={room.Roomnumber} id={room.Roomnumber}
                onClick={() => { setRoomnumber(room.Roomnumber); let allElements = document.getElementsByClassName('selected'); for (let i = 0; i < allElements.length; i++) { allElements[i].classList.remove('selected'); }; document.getElementById(`${room.Roomnumber}`).classList.add('selected') }}
                onMouseOver={() => { let allElements = document.getElementsByClassName('hovered'); for (let i = 0; i < allElements.length; i++) { allElements[i].classList.remove('hovered'); }; document.getElementById(`${room.Roomnumber}`).classList.add('hovered') }}
                onMouseOut={() => { let allElements = document.getElementsByClassName('hovered'); for (let i = 0; i < allElements.length; i++) { allElements[i].classList.remove('hovered'); } }}
                style={{ cursor: 'pointer' }}>
                <td>{room.Roomnumber}</td>
                <td>{room.Roomdescritpion}</td>
                <td>{room.Roomspecials}</td>
                <td>{room.Roomcapacity}</td>
            </tr>
        )

        if (((room.Roomspecials.toLocaleLowerCase().includes(resFilter.toLocaleLowerCase()) ||
            room.Roomdescritpion.toLocaleLowerCase().includes(resFilter.toLocaleLowerCase()) ||
            String(room.Roomnumber).toLocaleLowerCase().includes(resFilter.toLocaleLowerCase()))) &&
            (filterOption === 'Everything' || filterOption === '')) {
            return liste
        }
        else if (room.Roomspecials.toLocaleLowerCase().includes(resFilter.toLocaleLowerCase()) && filterOption === 'Properties') {
            return liste
        }
        else if (room.Roomdescritpion.toLocaleLowerCase().includes(resFilter.toLocaleLowerCase()) && filterOption === 'Description') {
            return liste
        }
        else if (String(room.Roomnumber).toLocaleLowerCase().includes(resFilter.toLocaleLowerCase()) && filterOption === 'Roomnumber') {
            return liste
        }
        else if (resFilter === '') {
            return liste
        }
    })
    return (filteredList)
}

