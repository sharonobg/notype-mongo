import Link from "next/link"
import RemoveBlog from "../components/RemoveBlog";
import {HiPencilAlt} from "react-icons/hi";
import {headers} from "next/headers"

const getBlogs = async () => {
    try{
        const res = await fetch("http://localhost:3000/api/myblog",{
            cache: 'no-store',
           method: "GET",
           headers: headers(),
        });
        if(!res.ok){
            throw new Error("Failed to fetch blogs");
        }
        //console.log('res in route: ',res)
        return res.json();
    }catch(error){
        console.log("Error finding blogs",error)

    }
}

export default async function BlogsList() {
    
    const {blogs} = await getBlogs();

    return(
       <>
       <div className="my-5 flex flex-col place-items-center">
       <h2>Blogs list by id</h2>
        {blogs?.length > 0 ? (blogs.map((blog) => 
        <div key={blog._id} className="flex flex-col place-items-center w-[50%] min-h-[50%]">
            <div className="flex border border-collapse border-blue-600 p-0 gap-2 my-0 items-start justify-between"> 
                <div className="flex flex-row items-start border border-amber-500">
                    <div className="border border-amber-500 w-[200px] py-2">{blog.title}</div>
                    <div className="border border-amber-500 w-[200px] py-2">{blog.description}</div>
                    <div className="border border-amber-500 w-[200px] py-2">{blog.category}</div>
                </div>
            </div>
        </div>
       ) ): "no blogs are available"}
       </div>
       </>
        
    )
}