import { useState } from "react";
import {useAuthContext} from '../hooks/useAuthContext'
 
export const useLogin=()=>{
    const {dispatch}=useAuthContext()
    const [isPending,setIsPending]=useState(false)
    const [error,setError]=useState(null)

    const login=async(email,password)=>{
       setIsPending(true)
       setError(null)
       
       const response=await fetch("/api/user/login",{
        method:"post",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify({email,password})
       })
       const json=await response.json()

       if(!response.ok){
         setIsPending(false)
         setError(json.error)  
       }
       if(response.ok){
        setError(null)
        // save user to Local Storage
        localStorage.setItem('user',JSON.stringify(json))

        dispatch({
            type:"LOGIN",
            payload:json
        })
        setIsPending(false)
       }
    }

    return {isPending,error,login}
}