import { useState } from 'react'
import Draft from './Draft'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Draft/>
    </div>
  )
}

export default App
