"use client"

import React,{useState,useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {ToastContainer ,toast} from 'react-toastify';
import {useSession}from 'next-auth/react';

const CreateTransaction = () => {

    const {data:session,status} = useSession();
    const router= useRouter();
    const [transdate,setTransdate]= useState("")
    const [descr,setDescr]= useState("")
    const [acctype,setAcctype]= useState("")
    const [amount,setAmount]= useState("")

    
    if(status === 'loading'){
        return <p>Loading...</p>
    }
    if(status === 'unauthenticated'){
        return <p className="font-bold text-red-500">Access Denied</p>
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!title){
            toast.error("Please add title with more than 6 characters!")
            return
        }
        try{
            const res = await fetch('http://localhost:3000/api/transaction',{
                headers:{
                    "Content-type":"application/json",
                    "Authorization":`Bearer ${session?.user?.accessToken}`
                },
                method:'POST',
                body:JSON.stringify({title})
            })
            if(!res.ok){
                throw new Error("Error on auth")
            }
            const transaction = await res.json();
            router.push(`/addTransaction/${transaction?._id}`)
        }catch (error) {
            throw new Error("Failed to add a transaction")
        }
    }
    return(
        <>
        
        <div className="flex flex-col w-full place-items-center border-l-orange-100">
            <h2>Create Transaction</h2>
            <form onSubmit={handleSubmit} className="flex flex-col flex-wrap gap-5 my-3">
                <input onChange={(e) => setDescr(e.target.value)}
                    className=""
                    name="transaction-descr"
                    placeholder="Transaction Description"
                    type="text"
                />
                
                <button className="bg-blue-400 rounded-md p-3 text-white font-semibold" type="submit">Create Transaction</button>
            </form>
        </div>
        <ToastContainer />
        </>)
}
export default CreateTransaction