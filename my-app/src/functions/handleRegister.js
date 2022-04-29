export default function handleRegister(email, password, repeatPassword, setEmailError, setPasswordError, setEmail, setPassword, setRepeatPassword) {

    setEmailError('')
    setPasswordError('')

    if (email == '' || password == '' || repeatPassword == '') {
        setEmailError('Email and Password fields cannot be empty!')
        setPasswordError('Email and Password fields cannot be empty!')
    }
    else if (password === repeatPassword) {
        (async () => {
            try {
                await fetch('/addUser', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: email, password: password })
                }).then((res) => {
                    return res.json()
                })
                    .then(data => {
                        if (data.exist) {
                            setEmailError('Email already registered! Try logging in!')
                        }
                        else alert('Registration successful!')
                        setEmail('')
                        setPassword('')
                        setRepeatPassword('')
                    })
            }
            catch (err) {
                console.log(err);
            }
        })()
    }
    if (password !== repeatPassword) {
        setPasswordError('passwords do not match')
    }
}