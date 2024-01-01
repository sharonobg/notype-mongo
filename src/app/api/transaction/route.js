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
        //await connect();
        const session = await getServerSession(authOptions);
        //console.log('session: ',session)
        const sessionUser = session?.user?._id;
        //const  transactions= await Transaction.find({"authorId":sessionUser});
       //console.log('transactions fr route: ',transactions)
        //return NextResponse.json(
        //    {transactions},
        //    {message: "Transactions list works"},
        //    {status: 201}
        //)
        //return new Response(JSON.stringify(transactions),{status:200})
        const transactions= await Transaction.aggregate([
          //{ $match: { $expr : { $eq: [ '$authorId' , { $toObjectId: sessionUser } ] } } },//WORKS!!
          { $match: {
              //"categoryId": { $exists: true, },
               $expr : { $eq: [ '$authorId' , { $toObjectId: sessionUser } ] } 
          }},
           {
              "$lookup": {
                "from": "categories",
                "let": {
                  categoryId: {
                    //"$toObjectId": "$categoryId"
                    "$toObjectId": "$categoryId"
                  }
                },
                "pipeline": [
                  {
                    $match: {
                      $expr: {
                        $eq: [
                          "$_id",
                          "$$categoryId"
                        ]
                      }
                    }
                  },
                  {
                    $project: {
                      //_id:0,
                     //"descr":1,
                      title: 1,//category title,
                      //amount:1
                      
                    }
                  }
                ],
                "as": "category"
              }
            },
            {
              "$unwind": "$category"
            },
            {
              $project: {
                //_id: 0,
                "transdate":1,
                "descr":1,
                "acctype":1,
                title: "$category.title",
                "amount":1
              }
            },
            {
              "$sort": {
                "transdate": -1,
                //"name": 1
              }
            }
          
      ])
      return NextResponse.json(
        {transactions},
        {message: "Transactions list works"},
        {status: 201}
    )
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
        console.log('body fr route',body)//ok
        const newTransaction = await Transaction.create(body);
        console.log('newTransaction fr route',newTransaction)
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

