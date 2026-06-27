import { useState } from 'react'
import './App.css'
import Landing from './Pages/Landing'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <h1 className='text-5xl text-teal-800'>{"WWE"}</h1> */}

      <Landing />
      
    </>
  )
}

export default App