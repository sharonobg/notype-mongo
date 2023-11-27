import Link from "next/link"
import {HiPencilAlt} from "react-icons/hi";
import {headers} from "next/headers"

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

export default async function TransactionList() {
    
    const {transactions} = await getTransactions();

    return(
       <>
       <div className="my-5 flex flex-col place-items-center">
       <h2>Transaction list by id</h2>
        {transactions?.length > 0 ? (transactions.map((transaction) => 
        <div key={transaction._id} className="flex flex-col place-items-center w-[50%] min-h-[50%]">
            <div className="flex border border-collapse border-blue-600 p-0 gap-2 my-0 items-start justify-between"> 
                <div className="flex flex-row items-start border border-amber-500">
                    <div className="border border-amber-500 w-[200px] py-2">{transaction.descr}</div>
                    <div className="border border-amber-500 w-[200px] py-2">{transaction.acctype}</div>
                </div>
            </div>
        </div>
       ) ): "no transactions are available"}
       </div>
       </>
        
    )
}