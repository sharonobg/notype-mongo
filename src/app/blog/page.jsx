import connect from '../../libs/mongodb'
import {headers} from "next/headers"
//654ebd3767c0637c5471b6b5

const getBlogs = async () => {
    await connect();
    try{
        const res = await fetch("http://localhost:3000/api/blog",{
        method: "GET",
        headers: headers()
    }).then((res)=> res.json());
    
    if(!res.ok){
        throw new Error("Failed to fetch blogs");
    }
    console.log(res)
    //return res.json();
}catch (error){
    console.log("Error finding blogs",error)
}
}
export default async function BlogsList() {
    
    
    //const {blogs} = await getBlogs();
    return(
       <>
       <div>
            <div>
                API Route from <span className="text-amber-700">Server</span>
            </div>
            <div>Name from Server: {res?.name}</div>
        </div>
        {blogs?.length > 0 ? (blogs.map((blog) => 
        <div key={blog._id} className="flex flex-col place-items-center w-[50%] min-h-[50%]">
            <div className="flex border border-collapse border-blue-600 p-0 gap-2 my-0 items-start justify-between"> 
                <div className="flex flex-row items-start border border-amber-500">
                    <div className="border border-amber-500 w-[200px] py-2">{blog.title}</div>
                    <div className="border border-amber-500 w-[200px] py-2">{blog.description}</div>
                    <div className="border border-amber-500 w-[200px] py-2">{blog.category}</div>
                </div>
                <div className="flex gap-2">
                    <RemoveBlog id={blog._id} />
                    <Link className="p-0" href={`/blog/edit/${blog._id}`}>
                        <HiPencilAlt size={24} />
                    </Link>
                </div>
            </div>
        </div>
       ) ): "no blogs are available"}
        </>
        
    )
}