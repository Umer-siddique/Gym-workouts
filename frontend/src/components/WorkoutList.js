import React, { useEffect, useState } from 'react'
import './WorkoutList.css'
import { useWorkoutContext } from '../hooks/useWorkoutContext'
import { useAuthContext } from '../hooks/useAuthContext'


// components
import Workouts from './Workouts'

const WorkoutList = () => {
  
  const { workouts, dispatch } = useWorkoutContext()
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)

  const { user } = useAuthContext()

  useEffect(() => {
    const fetchDocuments = async () => {
      setIsPending(true)
      setError(null)
      try {
        const response = await fetch('/api/workout',{
          headers:{
            "Authorization": `Bearer ${user.token}`
          }
        })
        const json = await response.json()
        if (!response.ok) {
          throw new Error(json.msg)
        }
        if (response.ok) {
          console.log(json)
          setIsPending(false)
          dispatch({
            type: "SET_WORKOUTS",
            payload: json
          })
          setError(null)
        }
      }
      catch (err) {
        setError(err.message)
        console.log("Could Not fetch the Data")
        setIsPending(false)
      }
    }
    // fetchDocuments()
    if (user) {
      fetchDocuments()
    }
  }, [dispatch,user])

  return (
    <div className='workoutList'>
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {
        workouts && workouts.map((doc) => {
          return <Workouts key={doc._id} doc={doc} />
        })
      }
    </div>
  )
}

export default WorkoutList