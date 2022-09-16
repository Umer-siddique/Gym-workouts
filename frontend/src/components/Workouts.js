import React from 'react'
import { Icon } from '@iconify/react';
// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useWorkoutContext } from '../hooks/useWorkoutContext';
import { useAuthContext } from '../hooks/useAuthContext';

const Workouts = ({doc}) => {
  const {dispatch}=useWorkoutContext()
  const {user}=useAuthContext()

  const deleteWorkout=async()=>{
       
    if(!user){
      alert("user must be logged in for moderating the data")
      return
    }
    const response=await fetch(`/api/workout/${doc._id}`,{
      method:"DELETE",
      headers:{
        "Authorization":`Bearer ${user.token}`
      }
    })
    const json=await response.json()

    if(response.ok){
      dispatch({
        type:"DELETE_WORKOUT",
        payload:json
      })
    }
  }

  return (
    <div className='workouts'>
      <h2>{doc.title}</h2>
      <p>Load (kg):<strong>{doc.load}</strong></p>
      <p>Reps:<strong>{doc.reps}</strong></p>
      <p>{formatDistanceToNow(new Date(doc.createdAt),{addSuffix:true})}</p>
      <button title='Delete' onClick={deleteWorkout}><Icon icon="mdi:trash-can" className='trashcan'/></button>
    </div>
  )
}

export default Workouts