"use client"

import React,{useState,useEffect} from 'react';
import Link from 'next/link';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import { BsFillPencilFill } from 'react-icons/bs'
import { AiFillDelete } from 'react-icons/ai'

const TransactionDetails = (ctx) => {
    const [transactionDetails,setTransactionDetails]=useState("");

    const{data: session}= useSession();
    const router = useRouter();

    useEffect(() => {
       //const id = ctx.params.id
       async function fetchTransaction(){                        
           const res = await fetch(`http://localhost:3000/api/transaction/${ctx.params.id}`,{cache:'no-store'})
           
           const transaction = await res.json()
           console.log('transaction after await: ',transaction)
           setTransactionDetails(transaction);
           //console.log('transaction description: ',transaction?.descr)
       }
      session && fetchTransaction()
      
    },[session])
 const handleDelete = async (ctx) => {
    try{
        const confirmModal = confirm("Do you want to delete this transaction?");
        if(confirmModal){
            const res = await fetch(`http://localhost:3000/api/transaction/${ctx.params.id}`,{
            headers:{
                "Authorization": `Bearer ${session?.user?.accessToken}`
            },
            method:"DELETE"
        }) 
        if(res.ok){
            router.push("/")
        }
    }
        
    }catch(error){
        console.log('Error: ',error)
    }
  }
    return(
<div className="flex flex-col place-items-center">
        <div className="rounded-md w-[50%] p-3 place-items-center border border-blue-600 shadow-lg bg-yellow-100 min-h-[200px] text-black">
        <h3>Transaction Date: {transactionDetails?.transdate}</h3>
        <h3>Author: {transactionDetails?.authorId?.username}</h3>
        <h3>Account Type: {transactionDetails?.acctype}</h3>
        <h3>Description: {transactionDetails?.descr}</h3>
        <h3>Category: {transactionDetails?.categoryId}</h3>
        <h3>Amount: {transactionDetails?.amount}</h3>
        {transactionDetails?.authorId?._id
            ?(<div className="controls">
                <div className="flex gap-2 flex-row ">
                    <div className="flex flex-row">
                        <Link className="flex flex-row gap-1" href={`/transaction/edit/${ctx.params.id}`}>Edit<BsFillPencilFill /></Link>
                    </div>
                    <button onClick={handleDelete} className="flex flex-row gap-1" >Delete<AiFillDelete /></button>
                </div>
            </div>)
            :(<>        
            <div>No transactions available</div>
            </>)
        }
        
        </div>
</div>
    )
}
export default TransactionDetails