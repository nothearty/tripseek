import React, { useState } from "react"
import axios from "axios"
import "./TripForm.css"

const TripForm: React.FC = () => {
  const [city, setCity] = useState<string>("")
  const [dates, setDates] = useState<string>("")
  const [activities, setActivities] = useState<string[]>([])
  const [peopleCount, setPeopleCount] = useState<number>(1)
  const [response, setResponse] = useState<string>("")

  const handleActivityChange = (activity: string) => {
    setActivities((prevActivities) => {
      if (prevActivities.includes(activity)) {
        return prevActivities.filter((a) => a !== activity)
      } else {
        return [...prevActivities, activity]
      }
    })
  }

  const handleSubmit = async () => {
    try {
      const response = await axios.get("/generate", {
        params: {
          city,
          dates,
          activities: activities.join(","),
          peopleCount,
        },
      })
      setResponse(response.data.response)
    } catch (error) {
      console.error("Error generating trip:", error)
      setResponse("Error generating trip")
    }
  }

  return (
    <div className='container'>
      <h1>Plan your next adventure</h1>
      <div className='form-group'>
        <label htmlFor='city'>Where do you want to go?</label>
        <input
          type='text'
          id='city'
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='dates'>Select days</label>
        <input
          type='text'
          id='dates'
          value={dates}
          onChange={(e) => setDates(e.target.value)}
        />
      </div>
      <div className='form-group'>
        <label>Select the kind of activities you want to do</label>
        <div className='activities'>
          {[
            "Kid Friendly",
            "Museums",
            "Shopping",
            "Historical",
            "Outdoor Adventures",
            "Art & Cultural",
            "Amusement Parks",
          ].map((activity) => (
            <button
              key={activity}
              className={activities.includes(activity) ? "active" : ""}
              onClick={() => handleActivityChange(activity)}
            >
              {activity}
            </button>
          ))}
        </div>
      </div>
      <div className='form-group'>
        <label htmlFor='peopleCount'>How many people are going?</label>
        <input
          type='number'
          id='peopleCount'
          value={peopleCount}
          onChange={(e) => setPeopleCount(parseInt(e.target.value))}
          min='1'
        />
      </div>
      <button onClick={handleSubmit}>Create New Trip</button>
      {response && <div className='response'>{response}</div>}
    </div>
  )
}

export default TripForm
