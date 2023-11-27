import Link from "next/link"
import {headers} from "next/headers"
import AddTransaction from "../../components/AddTransaction";
import connect from '../../libs/mongodb'
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
export default async function createTransactionWithCat() {
    connect()
    const {categories} = await getCategories();
    return(
       <>
       <div className="flex flex-col place-items-center">
        <h1>Create Transaction</h1>
       <div className="py 5 my-4 flex flex-col place-items-center w-[50%] min-h-[50%] underline">
       
       
       <AddTransaction />
       </div>
       </div>
        </>
        
    )
}