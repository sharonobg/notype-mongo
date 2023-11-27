import connect from "../../../../libs/mongodb";
import{verifyToken} from '../../../../libs/jwt'
import Blog from "../../../../models/blogModel";


export async function GET(req,{params:{id}}){
    //await connect();
    //const id = ctx.params.id(can use ctx but id issues so revertin to params)
    try{
    const blog = await Blog.findById(id).populate("authorId").select('-password')
    return new Response(JSON.stringify(blog),{status:200})
} catch (error) {
    return new Response(JSON.stringify(null),{status:500})
}
}
export async function PUT(req,{params:{id}}){
    //await connect();
    const accessToken = req.headers.get('authorization')
    const token = accessToken.split(" ")[1]

    const decodedToken = verifyToken(token)
    if(!accessToken || !decodedToken){
        return new Response(JSON.stringify({error: "unauthorized (wrong or expired token)"}),{status:403})
    }
    try{
        //const { title, image, description } = req.body;
//Blog.findByIdAndUpdate(req.params.id, { title, image, description }, 
        //const id = ctx.params.id
        const body = await req.json()
        console.log('body befor breaks: ',body)
        const blog = await Blog.findById(id).populate("authorId");
        console.log(blog)
        if(blog?.authorId?._id.toString() !== decodedToken._id.toString()){
            return new Response(JSON.stringify({message:"Only author can update his blog"}),{status:403})
        }
        const updatedBlog = await Blog.findByIdAndUpdate(id, {$set:{...body} } ,{new: true})
    
        //console.log('updated: ',updatedBlog)

    return new Response(JSON.stringify(updatedBlog),{status: 200})
    //   return NextResponse.json(
    //    {updatedBlog},
    //    {message: "Blog edited"},
    //    {status: 201}
    //)


    } catch(error) {
        return new Response(JSON.stringify(null),{status:500})
    }
}

export async function DELETE(req){
    //await connect();
    const accessToken = req.headers.get('authorization')
    console.log('delete auth header: ', accessToken)
    const token = accessToken.split(" ")[1]
    const decodedToken = verifyToken(token)
    if(!accessToken || !decodedToken){
        return new Response(JSON.stringify({error: "unauthorized (wrong or expired token)"}),{status:403})
    }
    try{
        const blog = await Blog.findById(id).populate("authorId");
        if(blog?.authorId?._id.toString() !== decodedToken._id.toString()){
            return new Response(JSON.stringify({message:"Only author can delete his blog"}),{status:403})
        }
        await Blog.findByIdAndDelete(id)
        return new Response(JSON.stringify({message:"Blog deleted"}),{status: 200})
    } catch(error) {
        console.log('Error: ',error);
        return new Response(JSON.stringify(null),{status:500})
    }
}