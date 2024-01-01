"use client"
import React,{useState,useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {ToastContainer ,toast} from 'react-toastify';
import {useSession} from 'next-auth/react'

// server function
//const getCategories = async () => {
//    
//    try{
//        const categories = await fetch("http://localhost:3000/api/category",{
//        method: "GET",
//        headers: headers()
//    });
//    if(!categories.ok){
//        throw new Error("Failed to fetch categories");
//    }
//    console.log(categories)
//    return categories.json()
//    
//}catch (error){
//    console.log("Error finding categories",error)
//}
//}

const CreateTransaction = () => {
    const [transdate,setTransdate]= useState("")
    const [descr,setDescr]= useState("")
    const [acctype,setAcctype]= useState("")
    const [categories,setCategories]=useState([])
    const [categoryTitle,setCategoryTitle]= useState("")
    const [categoryId,setCategoryId]= useState("")
    const [amount,setAmount]= useState("")
    const {data:session,status} = useSession();
    const router= useRouter();

    
    useEffect(() => {
    
        fetch('http://localhost:3000/api/category')
          .then((res) => res.json())
          .then(({categories}) => {
            setCategories(categories)
            //setLoading(false)
          })
      }, [])
      if(status === 'loading'){
        return <p>Loading...</p>
    }
    if(status === 'unauthenticated'){
        return <p className="font-bold text-red-500">Access Denied</p>
    }

      if (!categories) return <p>no categories</p>
     console.log('categories: ',categories)
     const handleSelect = async (e) => {
        e.preventDefault();
        //const thisCatId = CategoryId.find({"title":e.target.value})
        setCategoryId(thisCatId._id)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!transdate || !descr ||!acctype  ||!amount){
            toast.error("Please fill in all the fields")
            return
        }
        try{
            const res = await fetch('http://localhost:3000/api/transaction',{
                headers:{
                    "Content-type":"application/json",
                    "Authorization":`Bearer ${session?.user?.accessToken}`
                },
                method:'POST',
                body:JSON.stringify({transdate,descr,acctype,amount,authorId:session?.user?._id})
            })
            if(!res.ok){
                throw new Error("Error on auth")
            }
            const transaction = await res.json();
            router.push(`/transaction/${transaction?._id}`)
        }catch (error) {

        }
    }
    return(
        <>
        
        <div className="flex flex-col w-full place-items-center border-l-orange-100">
            <h2>Create Transaction</h2>
            <div className="py 5 my-4 flex flex-col place-items-center w-[50%] min-h-[50%] text-blue-400 underline">
            <select onChange={(e) => setCategoryTitle(e.target.value)}>
                    {categories?.length > -1 ? 
                    (categories.map((category) => 
                        <option key={category._id} id={category._id} value={category.title}>{category.title}</option>

                   ) ): "no categories are available"}</select>
                    
                    </div>
            <form onSubmit={handleSubmit} className="flex flex-col flex-wrap gap-5 my-3">
                <input onChange={(e) => setTransdate(e.target.value)}
                    className=""
                    name="transdate"
                    placeholder="Transaction Date"
                    type="date"
                />
                <input onChange={(e) => setDescr(e.target.value)}
                className="px-4 py-2 mt-4 mx-5 border border-green-200 text-green-500"
                name="description"
                placeholder="Description"
                type="text"
                />
                {/*<select value ={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="food_in">Food-in</option>
                <option value="food_out">Food-out</option>
                <option value="mortgage">Mortgage</option>
                <option value="entertainment">Entertainment</option>
                </select>*/}
                <select type="text" value ={acctype} onChange={(e) => setAcctype(e.target.value)}>
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
                
                />
                <button className="bg-blue-400 rounded-md p-3 text-white font-semibold" type="submit">Create Transaction</button>
            </form>
        </div>
        <ToastContainer />
        </>)
}
export default CreateTransaction