"use client"

import React, {useState,useEffect} from 'react'
import {useSession}from 'next-auth/react';
import {useRouter} from 'next/navigation'
import {ToastContainer ,toast} from 'react-toastify';

const Edit = (ctx) => {
    const [transdate,setTransdate]= useState("")
    const [descr,setDescr]= useState("")
    const [acctype,setAcctype]= useState("")
    const [categoryId,setCategoryId]= useState("")
    const [authorId,setAuthorId]= useState("")
    const [amount,setAmount]= useState("")
    const {data:session,status} = useSession();
    const router = useRouter();

useEffect(() => {
    async function fetchTransaction(){
        const id = ctx.params.id;
        const res = await fetch(`http://localhost:3000/api/transaction/${id}`);
        const transaction = await res.json();

        setTransdate(transaction.transdate);
        setDescr(transaction.descr);
        setAcctype(transaction.acctype);
        setCategoryId(transaction.categoryId);
        setAuthorId(transaction.authorId);
        setAmount(transaction.amount);
    }
    fetchTransaction()
},[])
if(status === 'loading'){
    return <p>Loading...</p>
}
if(status === 'unauthenticated'){
    
    return <p className="font-bold text-red-500">AccessDenied</p>
}
const handleSubmit= async (e) => {
    e.preventDefault();
    
    if(!transdate ||!descr||!categoryId || !amount || !acctype){
        toast.error("Please fill in all the fields")
        return
    }
    try{
        const id = ctx.params.id;
        const body = {transdate,descr,acctype,categoryId,authorId:session?.user?._id,amount}
        const res = await fetch(`http://localhost:3000/api/transaction/${id}`,{
        headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${session?.user?.accessToken}`
        },
        method: "PUT",
        //body: JSON.stringify(body)
        body:JSON.stringify(body)
        
    })
    console.log('res after edit:',res)
    if(res.ok){
        console.log("Edit went through")
    }else{
        console.log("Edit failed")
    }

    const transaction = await res.json();
    console.log(transaction);
    router.push("/");
    }catch(error){
        console.log(error)
    }

    
}

return(
    <>
        <div className="flex flex-col w-full place-items-center border-l-orange-100">
            <h2>Edit Transaction</h2>
            <form onSubmit={handleSubmit} className="flex flex-col flex-wrap gap-5 my-3">
            <input value={transdate} onChange={(e) => setTitle(e.target.value)}
                    className=""
                    name="transaction-date"
                    placeholder="Transaction Date"
                    type="text"
                />
                <input value={descr} onChange={(e) => setDescr(e.target.value)}
                    className="description"
                    name="transaction-description"
                    placeholder="Transaction Description"
                    type="text"
                />
                <select value ={acctype} onChange={(e) => setAcctype(e.target.value)}>
                <option value="food_in">Debit</option>
                <option value="food_out">Bank Account</option>
                <option value="mortgage">Cash</option>
                <option value="entertainment">Other</option>
                </select>
                {/*categoryId populate from categories collection*/}
                <select value ={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                <option value="food_in">Debit</option>
                </select>

                <input value={amount} onChange={(e) => setAmount(e.target.value)}
                    className="amount"
                    name="amount"
                    placeholder="Amount"
                    type="number"
                />
                
                <button className="bg-blue-400 rounded-md p-3 text-white font-semibold" type="submit">Edit Transaction</button>
            </form>
            
        </div>
        <ToastContainer />
    </>
)
}
export default Edit
