import { useState } from 'react'
import Page from './component/Page'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  
  return (
    <>
    <Page/>
    </>
  )
}

export default App
