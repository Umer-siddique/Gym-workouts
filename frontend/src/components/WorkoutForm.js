import React, { useState } from 'react'
// import { useFetch } from '../hooks/useFetch'
import './WorkoutForm.css'

import { useWorkoutContext } from '../hooks/useWorkoutContext'
import { useAuthContext } from '../hooks/useAuthContext'

const WorkoutForm = () => {
  const { dispatch } = useWorkoutContext()
  const {user}=useAuthContext()
  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  // const { isPending, documents, error, postData } = useFetch("/api/workout", "POST")

  
  const resetForm = () => {
    setTitle('')
    setReps('')
    setLoad('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(!user){
      alert("User must be logged in to Add workouts..")
      return
    }

    const workout = { title, load, reps }
    const response = await fetch('/api/workout', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization":`Bearer ${user.token}`
      },
      body: JSON.stringify(workout),
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({
        type: "CREATE_WORKOUTS",
        payload: json
      })
      resetForm()
    }
  }

  return (
    <div className='workoutForm'>
      <form onSubmit={handleSubmit}>
        <h2>Create New Workouts</h2>
        <label>
          <span>Exercise Title:</span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>
        <label>
          <span>Load (in kg):</span>
          <input
            type="number"
            onChange={(e) => setLoad(e.target.value)}
            value={load}
            required
          />
        </label>
        <label>
          <span>Reps:</span>
          <input
            type="number"
            onChange={(e) => setReps(e.target.value)}
            value={reps}
            required
          />
        </label>
        <button>Add Workouts</button>
      </form>
    </div>
  )
}

export default WorkoutForm