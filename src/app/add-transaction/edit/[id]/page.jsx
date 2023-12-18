"use client"

import React, {useState,useEffect} from 'react'
import {useSession}from 'next-auth/react';
import {useRouter} from 'next/navigation'
import {ToastContainer ,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/*const getCategories = async () => {
    
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
}*/
const Edit = (ctx) => {
    let newdate = new Date().toISOString();
    console.log('newdate',newdate)
    const [transactionDetails,setTransactionDetails]=useState("");
    const [transdate,setTransdate]= useState(newdate)
    const [descr,setDescr]= useState("")
    const [acctype,setAcctype]= useState("")
    const [categories,setCategories]=useState([])
    const [categoryTitle,setCategoryTitle]= useState("")
    const [categoryId,setCategoryId]= useState("")
    const [amount,setAmount]= useState("")
    const {data:session,status} = useSession();
    const router= useRouter();
    /*const [categories,setCategories]=useState([])*/

    //eEffect(() => {
    //  async function getCateg(){
    //  fetch('/api/category')
    //    .then((res) => res.json())
    //    .then(({categories}) => {
    //      setCategories(categories)
    //      //setLoading(false)
    //    })}
    //}, [])
    //if (!categories) return <p>no //categories</p>

//useEffect(() => {
//    async function fetchTransaction(){
//        const id = ctx.params.id;
//        const res = await fetch(`http:////localhost:3000/api/transaction/${id}`);
//        const transaction = await res.json();
//        let newdate = new Date().toISOString();
//    console.log('newdate',newdate)
//        //const transdate = transaction.newdate;
//        const transdate = transaction.newdate;
//        const dataamount=transaction.amount.//$numberDecimal;
//        setTransdate(transaction.newdate)
//        setDescr(transaction.descr)
//        setAcctype(transaction.acctype)
//        //setCategoryTitle(transaction.////categoryTitle)
//        setAmount(transaction.amount.$numberDecimal)
//    }
//    fetchTransaction()
//    
//},[])
useEffect(() => {
    
    fetch('http://localhost:3000/api/category')
      .then((res) => res.json())
      .then(({categories}) => {
        setCategories(categories)
        //setLoading(false)
      })
  }, [])
useEffect(() => {
    const id = ctx.params.id
   async function fetchTransaction(){                        
       const res = await fetch(`http://localhost:3000/api/transaction/${ctx.params.id}`,{cache:'no-store'})
       
       const transaction = await res.json()
       const transdate = new Date().toISOString();
       const dataamount=transaction.amount.$numberDecimal;
       //console.log('dataamount: ',dataamount)
       //console.log('transaction after await: ',transaction)
       //setTransactionDetails(transaction);
       setTransactionDetails({
            transdate:transdate,
            descr:transaction?.descr,
            acctype:transaction.acctype,
            categoryTitle:transaction.categoryTitle,
            amount: dataamount,
            authorId:session?.user?._id})
    }
    session && fetchTransaction()
  
},[session])
console.log('transactionDetails after set: ',transactionDetails)
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
        const body = {
            transdate,acctype,descr,amount
        /*,
    categoryTitle,*/}
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
    console.log('transaction edit: ',transaction);
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
            <h2>{transactionDetails?.transdate}</h2>
            <input onChange={(e) => setTransdate(e.target.value)}
                    className=""
                    name="transdate"
                    placeholder="Transaction Date"
                    type="date"
                    valueDefault={null}
                    value={transactionDetails?.transdate}
                />
                <input onChange={(e) => setDescr(e.target.value)}
                className="px-4 py-2 mt-4 mx-5 border border-green-200 text-green-500"
                name="description"
                placeholder="Description"
                type="text"
                value={transactionDetails?.descr}
                />
                <select onChange={(e) => setCategoryTitle(e.target.value)}
                className="px-4 py-2 mt-4 mx-5 border border-green-200 text-green-500"
                name="categoryTitle"
                placeholder="Category"
                type="text"
                value={transactionDetails?.categoryTitle}
                >
                    {categories?.length > -1 ? 
                    (categories.map((category) => 
                        <option key={category._id} id={category._id} value={category.title}>{category.title}</option>

                   ) ): "no categories are available"}</select>
                <select type="text" value ={transactionDetails?.acctype} onChange={(e) => setAcctype(e.target.value)}>
                <option value="debit">Debit</option>
                <option value="cash">Cash</option>
                <option value="bank_account">Bank Account</option>
                <option value="other">Other</option>
                </select>
                
                {/*<select onChange={(e) => setCategoryTitle(e.target.value)}>
                    {categories?.length > -1 ? 
                    (categories.map((category) => 
                        <option key={category._id} id={category._id} value={category.title}>{category.title}</option>

                   ) ): "no categories are available"}</select>*/}
                <input onChange={(e) => setAmount(e.target.value)}
                name="amount"
                placeholder="0.00"
                type="string"
                value={transactionDetails?.amount}
                />
                <button className="bg-blue-400 rounded-md p-3 text-white font-semibold" type="submit">Create Transaction</button>
            </form>
            
        </div>
        <ToastContainer />
    </>
)
}
export default Edit
