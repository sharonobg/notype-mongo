import connect from "../../../../libs/mongodb";
import Topic from "../../../../models/topicModel";
import {NextResponse} from "next/server";

export async function PUT(request,{params:{id}}){
    const {id } = params;
    const { newTitle: title, newDescr: description } = await request.json();
    //await connect();
    await Topic.findByIdAndUpdate(id,{title,description});
    return (
        NextResponse.json(
            {message:"Topic updated"},
            {status:200}
        )
    )
}

export async function GET(request,{params}){
    const {id } = params;
    //await connect();
    await Topic.findOne({_id:id});
    return (
        NextResponse.json(
            {message:"Topic found"},
            {status:200}
        )
    )
}