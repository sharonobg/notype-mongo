import connect from "../../../libs/mongodb";
import{verifyToken} from '../../../libs/jwt'
import {NextResponse} from "next/server";
import Blog from "../../../models/blogModel";
import {getServerSession} from "next-auth"
import {authOptions}from"../auth/[...nextauth]/route"

export async function GET(request){
    //send data as JSON
    try{
        //await connect();
        const session = await getServerSession(authOptions);
    //console.log('session: ',session)
    const sessionUser = session?.user?._id;
    //console.log('sessionUser: ',sessionUser)
        //const  blogs= await Blog.find({"authorId":"654ebd3767c0637c5471b6b5"});
        const  blogs= await Blog.find({"authorId":sessionUser});
        //const blogs = await Blog.find({}).populate("authorId");
        return NextResponse.json(
            {blogs},
            {message: "Blogs list works"},
            {status: 201}
        )
        //return new Response(JSON.stringify(blogs),{status:200})
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
        const newBlog = await Blog.create(body);
        return new Response(JSON.stringify(newBlog),{status: 201})
    }catch (error){
        return new Response(JSON.stringify(null),{status:500})
    }
}
export async function DELETE(request){
    //send data as json
    const id = request.nextUrl.searchParams.get('id');
    //await connect();
    await Blog.findByIdAndDelete(id);
    return NextResponse.json(
        
        {message: "Blog deleted"},
        {status: 200}
    )
}

