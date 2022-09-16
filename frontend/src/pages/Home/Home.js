import React from 'react'
import "./Home.css"

// pages && components
import WorkoutForm from '../../components/WorkoutForm'
import WorkoutList from '../../components/WorkoutList'

const Home = () => {
  return (
    <div className='home'>
      <WorkoutList/>
      <WorkoutForm/>
    </div>
  )
}

export default Home