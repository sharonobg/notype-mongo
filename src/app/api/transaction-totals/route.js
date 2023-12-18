import connect from "../../../libs/mongodb";
import{verifyToken} from '../../../libs/jwt'
import {NextResponse} from "next/server";
import Transaction from "../../../models/transactionModel";
//import Category from "../../../models/categoryModel";
import {getServerSession} from "next-auth"
import {authOptions}from"../auth/[...nextauth]/route"
import mongoose,{models,Schema} from "mongoose";

export async function GET(request){
    //send data as JSON
    try{
        await connect();
        const session = await getServerSession(authOptions);
        //console.log('session: ',session)
        const sessionUser = session?.user?._id;
        console.log(sessionUser)
        //const transactions= await Transaction.aggregate([
            //{"$group" : {_id: "$authorId", "amount_totals" : {$sum: "$amount"}}}])
        //results of above:
        /*
        {"transactions":[
            {"_id":"654d1bc50c2900cc8ea6485c","amount_totals":{"$numberDecimal":"283.00"}},{"_id":"654ebd3767c0637c5471b6b5","amount_totals":{"$numberDecimal":"0"}},{"_id":"6546abe8a94ba7457b74a9be",
            "amount_totals":{"$numberDecimal":"170.43"}}]}
        */
    
        const transactionstotal= await Transaction.aggregate([
            //{ $match: { $expr : { $eq: [ '$authorId' , { $toObjectId: sessionUser } ] } } },//WORKS!!
            { $match: {
                "categoryId": { $exists: true, },
                 $expr : { $eq: [ '$authorId' , { $toObjectId: sessionUser } ] } 
            }}, //WORKS
            {
                "$group" : {_id: "$categoryId","amount": {$sum: "$amount"}}//this groups by descr
            },
            
          ])



            console.log('transaction-totals',transactionstotal)
        
        return new Response(JSON.stringify(transactionstotal),{status:200})
    }catch(error){
        return new Response(JSON.stringify(null), {status:500})
    }
}

export async function POST(request){
    await connect();
    const accessToken = request.headers.get("authorization")
    const token = accessToken.split(' ')[1];
    const decodedToken = verifyToken(token);
    if(!accessToken || !decodedToken){
        return new Response(JSON.stringify({error: "unauthorized (wrong or expired token)"}),{status:403})
    }
    try{
        const body = await request.json();
        console.log('body fr route',body)//ok
        const newTransaction = await Transaction.create(body);
        console.log('newTransaction',newTransaction)
        return new Response(JSON.stringify(newTransaction),{status: 201})
       
    }catch (error){
        return new Response(JSON.stringify(null),{status:500,error})
    }
}
export async function DELETE(request){
    //send data as json
    const id = request.nextUrl.searchParams.get('id');
    //await connect();
    await Transaction.findByIdAndDelete(id);
    return NextResponse.json(
        
        {message: "Transaction deleted"},
        {status: 200}
    )
}

