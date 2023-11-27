"use client"
import React,{useState} from 'react';
import {ToastContainer ,toast} from 'react-toastify';
//import classes from './register.module.css';// not sure why
import 'react-toastify/dist/ReactToastify.css';
import {useRouter} from 'next/navigation';
import {signIn} from 'next-auth/react'

const Register = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    //const [loggedIn,setLoggedIn] = useState(false);
    const handleSubmit= async (e) => {
        e.preventDefault();
        if (password === ''||email === ''){
            toast.error("All fields must have more than 6 characters");
            return
        }
        try{
            const res = await fetch("http://localhost:3000/api/register",{
                headers:{
                    "Content-type":"application/json"
                },
                method:"POST",
                body:JSON.stringify({username,email,password})
            })
            if (res.ok){
                router.push("/")
                toast.success("registered!")
                return
            }else{
                toast.error("Registration Error")
                return
            }
         }catch(error){

        }
    }
    return(
        <>
        
        <div className="flex flex-col w-full place-items-center">
        <div className="flex flex-col border p-4 border-blue-400 shadow-lg rounded-lg w-[50%] place-items-center">
            <div>
                <h2 className="text-3xl font-semibold text-blue-400">Register</h2>
                <form onSubmit={handleSubmit} className="flex flex-col flex-wrap gap-5 my-3">
                    <input
                        className="p-2 border border-gray-300 rounded-md"
                        type="text"
                        placeholder='Username'
                        onChange={(e)=>setUsername(e.target.value)} />
                    <input
                        className="p-2 border border-gray-300 rounded-md"
                        type="text"
                        placeholder='Role'
                        onChange={(e)=>setRole(e.target.value)} />
                    
                    <input
                        className="p-2 border border-gray-300 rounded-md"
                        type="email"
                        placeholder='Email'
                        onChange={(e)=>setEmail(e.target.value)} />
                    <input
                        className="p-2 border border-gray-300 rounded-md"
                        type="password"
                        placeholder='Password'
                        onChange={(e)=>setPassword(e.target.value)} />
                        <button className="bg-blue-400 rounded-md p-3 text-white font-semibold" type="submit">Register</button>
                        
                </form>
                <button onClick={() => signIn()}>Already have an account?<br />Login now</button>
            </div>
        </div>
        </div>
        <ToastContainer />
        </>
    )
    
}

export default Register