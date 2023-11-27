"use client"

import {useSession} from 'next-auth/react';
import Link from 'next/link';
import { BsFillPencilFill } from 'react-icons/bs'
import { AiFillDelete } from 'react-icons/ai'
import {HiPencilAlt} from "react-icons/hi";

export default function Blog(){
    
    return(
        <div className="flex flex-col place-items-center">
        <div className="rounded-md w-[50%] p-3 place-items-center border border-blue-600 shadow-lg bg-yellow-100 min-h-[200px] text-black">
        <h3>Title: {blog?.title}</h3>
        <h3>Author: {blog?.authorId?.username}</h3>
        <h3>Description: {blog?.description}</h3>
        <h3>Category: {blog?.category}</h3>
        {blogs?.length > 0 ? blogs.map((blog) => (
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
        )): "no blogs are available"}
        
        </div>
</div>
    )
}