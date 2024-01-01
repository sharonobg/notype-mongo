import Link from "next/link"
import { BsFillPencilFill } from 'react-icons/bs'
import {HiOutlineTrash} from "react-icons/hi";
import {headers} from "next/headers"
import {useSession} from 'next-auth/react'
import Category from "../models/categoryModel";
import RemoveTransaction from "../components/RemoveTransaction";
const getTransactions = async () => {
    try{
        const res = await fetch("http://localhost:3000/api/transaction",{
            cache: 'no-store',
            method: "GET",
            headers: headers(),
        });
        if(!res.ok){
            throw new Error("Failed to fetch transactions");
        }
        //console.log('res in route: ',res)
        return res.json();
    }catch(error){
        console.log("Error finding transactions",error)

    }
}

const getTotals = async () => {
    try{
        const res = await fetch("http://localhost:3000/api/transactiontitle-totals",{
           cache: 'no-store',
           method: "GET",
           headers: headers(),
        });
        if(!res.ok){
            throw new Error("Failed to fetch transactions");
        }
        //console.log('res in route totals: ',res)
        return res.json();
    }catch(error){
        console.log("Error finding transactions",error)

    }
}
export default async function TransactionList() {
    const {transactions} = await getTransactions();
   
    //console.log("transactions",{transactions})
    const transactiontotals = await getTotals();
    
    //console.log("transactiontotals",transactiontotals)
    return(
        
       <>
       <div className="my-5 flex flex-col place-items-center">
       <h2>Transaction list by id</h2>
        {transactions?.length > -1 ? (transactions.map((transaction) => 
            
        <div key={transaction._id} className="flex flex-col place-items-center w-[50%] min-h-[50%]">
            <div className="flex border border-collapse border-blue-600 p-0 gap-2 my-0 items-start justify-between"> 
                <div className="flex flex-row items-start border border-amber-500">

                    <div className="border border-amber-500 w-[200px] py-2">{transaction.transdate}</div>
                    <div className="border border-amber-500 w-[200px] py-2">{transaction.descr}</div>
                    <div className="border border-amber-500 w-[200px] py-2">{transaction.acctype}</div>
                    <div className="border border-amber-500 w-[200px] py-2">{transaction?.title}</div>
                    
                    
                    <div className="border border-amber-500 w-[200px] py-2">{transaction?.amount.$numberDecimal}</div>
                    <div className= "w-[100px] py-2">
                    <RemoveTransaction id={transaction._id} />
                        <Link className="flex flex-row gap-1 justify-center" href={`/transaction/${transaction?._id}`}><BsFillPencilFill /></Link>
                    </div>
                </div>
            </div>
        </div>
       ) ): "no transactions are available"}
       </div>
       <div className="my-5 flex flex-col place-items-center">
       {transactiontotals?.length > -1 ? (transactiontotals.map((transactiontotal) =>
       <div key={transactiontotal._id} className="border border-amber-500 w-[200px] py-2">TOTAL:{transactiontotal?._id}:{transactiontotal?.amount.$numberDecimal} </div>
       )):("cant find any totals")
       
       }
        </div>
       </>
        
    )
}