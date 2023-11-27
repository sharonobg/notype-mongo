"use client"

import React, {useState,useEffect} from 'react'
import {useSession}from 'next-auth/react';
import {useRouter} from 'next/navigation'
import {ToastContainer ,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const getCategories = async () => {
    
    try{
        const res = await fetch("http://localhost:3000/api/category",{
        method: "GET",
        headers: headers()
    });
    if(!res.ok){
        throw new Error("Failed to fetch categories");
    }
    
    return res.json()
}catch (error){
    console.log("Error finding categories",error)
}
}
const Edit = (ctx) => {
    const [transdate,setTransdate]= useState("")
    const [descr,setDescr]= useState("")
    const [acctype,setAcctype]= useState("")
    const [categoryTitle,setCategoryTitle]= useState("")
    const [amount,setAmount]= useState("")
    const {data:session,status} = useSession();
    const router= useRouter();
    const [categories,setCategories]=useState([])

    useEffect(() => {
        fetch('/api/category')
          .then((res) => res.json())
          .then(({categories}) => {
            setCategories(categories)
            //setLoading(false)
          })
      }, [])
      if (!categories) return <p>no categories</p>

useEffect(() => {
    async function fetchTransaction(){
        const id = ctx.params.id;
        const res = await fetch(`http://localhost:3000/api/transaction/${id}`);
        const transaction = await res.json();
        setTransdate(transaction.transdate)
        setDescr(transaction.descr)
        setAcctype(transaction.acctype)
        setCategoryTitle(transaction.categoryTitle)
        setAmount(transaction.amount)
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
    
    if(!descr){
        toast.error("Please fill in all the fields")
        return
    }
    try{
        const id = ctx.params.id;
        const body = {transdate,acctype,descr,categoryTitle,amount}
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
        toast.error("Edit failed")
        console.log("Edit failed")
    }

    const transaction = await res.json();
    console.log('edited transaction: ',transaction);
    //router.push("/");
    }catch(error){
        console.log(error)
    }

    
}

return(
    <>
        <div className="flex flex-col w-full place-items-center border-l-orange-100">
            <h2>Edit Transaction</h2>
            <form onSubmit={handleSubmit} className="flex flex-col flex-wrap gap-5 my-3">
            <input value={transdate} onChange={(e) => setTransdate(e.target.value)}
                name="transdate"
                placeholder="Transaction Date"
                type="date"
                />
                <input value={descr} onChange={(e) => setDescr(e.target.value)}
                name="description"
                placeholder="Description"
                type="text"
                />
                <select value={acctype} type="text" onChange={(e) => setAcctype(e.target.value)}>
                <option value="debit">Debit</option>
                <option value="cash">Cash</option>
                <option value="bank_account">Bank Account</option>
                <option value="other">Other</option>
                </select>
                <select value={categoryTitle} id={categoryTitle?._Id} onChange={(e) => setCategoryTitle(e.target.value)}>
        {categories?.length > -1 ? 
        
        (categories.map((category) => 
            <option key={category._id} value={category.title}  >{category.title}</option>
                
       ) ): "no categories are available"}</select>

    <input value={amount} onChange={(e) => setAmount(e.target.value)}
        name="amount"
        placeholder="Amount"
                />
                
                <button className="bg-blue-400 rounded-md p-3 text-white font-semibold" type="submit">Edit Transaction</button>
            </form>
            
        </div>
        <ToastContainer />
    </>
)
}
export default Edit
