import connect from "../../../libs/mongodb";
import Topic from "../../../models/topicModel";
import {NextResponse} from 'next/server';

export async function POST(request){
    //send data as json
    const{title,description} = await request.json();
    await connect();
    await Topic.create({title,description});
    return NextResponse.json(
        {message: "Topic Created"},
        {status: 201}
    )
}

export async function GET(request){
    //send data as json
    await connect();
    const topics = await Topic.find();
    return NextResponse.json(
        {topics},
        {message: "Topics list works"},
        {status: 201}
    )
}

export async function DELETE(request){
    //send data as json
    const id = request.nextUrl.searchParams.get('id');
    await connect();
    await Topic.findByIdAndDelete(id);
    return NextResponse.json(
        
        {message: "Topic deleted"},
        {status: 200}
    )
}