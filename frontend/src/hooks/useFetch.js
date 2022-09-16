// import { useEffect,useState } from "react";

// export const useFetch=(url,method="GET")=>{
    
//     const [documents,setDocuments]=useState(null)
//     const [error,setError]=useState(null)
//     const [isPending,setIsPending]=useState(false)
//     const [options,setOptions]=useState(null)

//        const postData=(formData)=>{
//         setOptions({
//             method:"post",
//             headers:{
//                 "Content-Type":"application/json"
//             },
//             body:JSON.stringify(formData),
//         })
//        }

//       useEffect(()=>{

//      const fetchDocuments=async(fetchOptions)=>{
//          setIsPending(true)
//          setError(null)
//          try{
//            const response=await fetch(url,fetchOptions)
//            const json=await response.json()
//            if(!response.ok){
//             throw new Error(response.statusText)
//            }
//            console.log(json)
//            setIsPending(false)
//            setDocuments(json)
//            setError(null)
//          }
//          catch(err){
//             setError(err.message)
//             console.log("Could Not fetch the Data")
//             setIsPending(false)
//          }
//      }
//         if(method==="GET"){
//             fetchDocuments()
//         }
//         if(method==="POST"){
//             fetchDocuments(options)
//         }

//       },[url,method,options])

//       return {documents,isPending,error,postData}
// }