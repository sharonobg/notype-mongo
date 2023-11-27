import connect from "../../../libs/mongodb";
import{verifyToken} from '../../../libs/jwt'
import {NextResponse} from "next/server";
import Transaction from "../../../models/transactionModel";
import Category from "../../../models/categoryModel";
import {getServerSession} from "next-auth"
import {authOptions}from"../auth/[...nextauth]/route"

export async function GET(request){
    //send data as JSON
    try{
        await connect();
        const session = await getServerSession(authOptions);
        //console.log('session: ',session)
        const sessionUser = session?.user?._id;
        const  transactions= await Transaction.find({"authorId":sessionUser});
        //const transactions = await Transaction.find({}).populate("authorId");
        return NextResponse.json(
            {transactions},
            {message: "Transactions list works"},
            {status: 201}
        )
        //return new Response(JSON.stringify(transactions),{status:200})
    }catch(error){
        return new Response(JSON.stringify(null), {status:500})
    }
}

export async function POST(request){
    //await connect();
    const accessToken = request.headers.get("authorization")
    const token = accessToken.split(' ')[1];
    const decodedToken = verifyToken(token);
    if(!accessToken || !decodedToken){
        return new Response(JSON.stringify({error: "unauthorized (wrong or expired token)"}),{status:403})
    }
    try{
        const body = await request.json();
        console.log(body)
        const newTransaction = await Transaction.create(body);
        return new Response(JSON.stringify(newTransaction),{status: 201})
        console.log(body)
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

