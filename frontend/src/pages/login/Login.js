import React,{useState} from 'react'
import './Login.css'

import { useLogin } from '../../hooks/useLogin'

const Login = () => {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const {isPending,error,login}=useLogin()

  const handleSubmit=async(e)=>{
     e.preventDefault()
     await login(email,password)
  }

  return (
    <div className='login-form'>
       <form onSubmit={handleSubmit}>
        <h2>Login</h2>
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
        {isPending &&<button className='btn' disabled>Loading...</button>}
        {!isPending &&<button className='btn'>Login</button>}
        {error && <div className='error'>{error}</div>}
       </form>
    </div>
  )
}

export default Login