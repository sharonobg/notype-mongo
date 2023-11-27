import {getServerSession} from "next-auth"
import {NextResponse} from "next/server"
import {authOptions}from"../auth/[...nextauth]/route"
import connect from "../../../libs/mongodb";
import Blog from "../../../models/blogModel";
//654ebd3767c0637c5471b6b5

export async function GET() {
    try{
        await connect();
    const session = await getServerSession(authOptions);

    //const currId = session?.user?._id;
    
    //const blogs = await Blog.find({}).populate("authorId");
    //const blogsbyid= await Blog.find({});
    //console.log("blogsbyid",blogsbyid);
    const  blogsbyid= await Blog.find({"authorId":"654ebd3767c0637c5471b6b5"});
      //const blogs = await Blog.find({}).populate("authorId");
      //console.log('ln 21 current id: ',{name:session?.user?._id})
        return NextResponse.json(
            //{name: session?.user?._id ?? "not Logged In"},
            {blogsbyid},
            {message: "Blogs list works"},
            {status: 201}
        )
}catch (error){
    return new Response(JSON.stringify(null), {status:500})
}
}

