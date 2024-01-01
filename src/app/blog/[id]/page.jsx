"use client"
import React,{useState,useEffect} from 'react';
import Link from 'next/link';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import { BsFillPencilFill } from 'react-icons/bs'
import { AiFillDelete } from 'react-icons/ai'
import {HiOutlineTrash} from "react-icons/hi";
//myblog?.authorId?._id.toString() === session?.user._id.toString()

const BlogDetails = (ctx) => {
    const [blogDetails,setBlogDetails]=useState("");

    const{data: session}= useSession();
    const router = useRouter();

    useEffect(() => {
       const id = ctx.params.id
       async function fetchBlog(){                        
           const res = await fetch(`http://localhost:3000/api/blog/${ctx.params.id}`,{cache:'no-store'})
           
           const blog = await res.json()
           console.log('blog after await: ',blog)
           setBlogDetails(blog);
           console.log('blog title: ',blog?.title)
       }
      session && fetchBlog()
      
    },[session])
 const handleDelete = async (ctx) => {
    try{
        const confirmModal = confirm("Do you want to delete this blog?");
        if(confirmModal){
            const res = await fetch(`http://localhost:3000/api/blog/${ctx.params.id}`,{
            headers:{
                "Authorization": `Bearer ${session?.user?.accessToken}`
            },
            method:"DELETE"
        }) 
        if(res.ok){
            router.push("/")
        }
    }
        
    }catch(error){
        console.log('Error: ',error)
    }
  }
    return(
<div className="flex flex-col place-items-center">
        <div className="rounded-md w-[50%] p-3 place-items-center border border-blue-600 shadow-lg bg-yellow-100 min-h-[200px] text-black">
        <h3>Title: {blogDetails?.title}</h3>
        <h3>Author: {blogDetails?.authorId?.username}</h3>
        <h3>Description: {blogDetails?.description}</h3>
        <h3>Category: {blogDetails?.category}</h3>
        {blogDetails?.authorId?._id.toString() === session?.user?._id.toString()
            ?(<div className="controls">
                <div className="flex gap-2 flex-row ">
                    <div className="flex flex-row">
                        <Link className="flex flex-row gap-1" href={`/blog/edit/${ctx.params.id}`}>Edit<BsFillPencilFill /></Link>
                    </div>
                    <button onClick={handleDelete} className="flex flex-row gap-1" ><HiOutlineTrash size={24} /></button>
                </div>
            </div>)
            :(<>        
            <div>Author: {blogDetails?.authorId?.username}</div>
            </>)
        }
        
        </div>
</div>
    )
}
export default BlogDetails