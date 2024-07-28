// frontend/src/App.tsx
import { useState } from "react"
import axios from "axios"

const App = () => {
  const [response, setResponse] = useState("")

  const generateText = async () => {
    try {
      const result = await axios.get("/generate")
      setResponse(result.data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <button onClick={generateText}>Generate Text</button>
      <p>{response}</p>
    </div>
  )
}

export default App
