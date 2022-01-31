import StartingPage from './components/StartingPage';
import React, { useState } from 'react'


function App() {
  const [logIn, setLogIn] = useState(true)

  return (
    <>
      <StartingPage
        logIn={logIn}
        setLogIn={setLogIn}
      />
    </>
  )
}

export default App;
