import { createBrowserHistory } from 'history'

const history = createBrowserHistory()

export default function handleLogIn(email, password, setLoggedInEmployeeID, setLoggedInEmployee, navigate) {
    (async () => {
        try {
            await fetch('/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email, password: password })
            })
                .then((res) => {
                    return res.json()
                })
                .then(data => {
                    if (!data.auth) {
                        alert('Wrong Email and Password combination')
                    }
                    else {
                        fetch('/login/isUserAuth')
                            .then(res => { return res.json() })
                            .then(datas => {
                                if (datas) {
                                    setLoggedInEmployeeID(data.id)
                                    localStorage.setItem("employeeID", data.id)
                                    setLoggedInEmployee(email)
                                    localStorage.setItem("email", email)
                                    history.replace('/Homepage')
                                    navigate('/Homepage')
                                }
                            })
                    }
                })
        }
        catch (err) {
            console.log(err);
        }
    })()
}