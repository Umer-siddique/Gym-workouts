import React,{useState} from 'react'

import { useSignup } from '../../hooks/useSignup'

const Signup = () => {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const {signup,isPending,error}=useSignup()
  
  const handleSubmit=async(e)=>{
     e.preventDefault()
     await signup(email,password)
  }

  return (
    <div className='login-form'>
       <form onSubmit={handleSubmit}>
        <h2>Signup</h2>
        <label>
          <span>Email</span>
          <input 
          type="text"
          onChange={(e)=>setEmail(e.target.value)}
          value={email}
          />
        </label>
        <label>
          <span>Password</span>
          <input 
          type="password"
          onChange={(e)=>setPassword(e.target.value)}
          value={password}
          />
        </label>
        {isPending && <button className='btn' >Loading..</button>}
        {!isPending && <button className='btn' >signup</button>}
        {error && <div className='error'>{error}</div>}
       </form>
    </div>
  )
}

export default Signup