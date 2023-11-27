"use client"

import Link from "next/link"
import RemoveBlog from "../components/RemoveBlog";
import {HiPencilAlt} from "react-icons/hi";
import {useState,useEffect} from 'react';
import {useSession} from 'next-auth/react';

export default function getMyBlogs(){
    
    const [myBlogs,setMyBlogs]= useState("")
    const {data:session} = useSession();
    //const token = session?.user?.accessToken
    
    
 //const isOwner = myblog?.authorId?._id.toString() === session?.user._id.toString()
 useEffect(() => {
    async function fetchMyBlogs(){
        const res = await fetch("http://localhost:3000/api/myblog",{
            cache: 'no-store'
        });
        const myBlogs = await res.json()
    setMyBlogs(myBlogs)
    console.log(myBlogs)
}
//session && fetchMyBlogs(myBlogs.includes(session?.user?._id))
session && fetchMyBlogs()
},[session])
    
        const {blogs} = getMyBlogs();
    return(
       <>
       {/*
       {session &&
        <div>

        userID: {session.user._id} <br/>
        //name:  {session.user.name} <br/>
        //email:  {session.user.email} <br/>
        </div>
        }*/}
        {blogs?.length > 0 ? (blogs.map((blog) => 
        <div key={blog._id} className="flex flex-col place-items-center w-[50%] min-h-[50%]">
            <div className="flex border border-collapse border-blue-600 p-0 gap-2 my-0 items-start justify-between"> 
                <div className="flex flex-row items-start border border-amber-500">
                    <div className="border border-amber-500 w-[200px] py-2">{blog.title}</div>
                    <div className="border border-amber-500 w-[200px] py-2">{blog.description}</div>
                    <div className="border border-amber-500 w-[200px] py-2">{blog.category}</div>
                </div>
                {/*<div className="flex gap-2">
                    <RemoveBlog id={blog._id} />
                    <Link className="p-0" href={`/blog/edit/${blog._id}`}>
                        <HiPencilAlt size={24} />
                    </Link>
                </div>*/}
            </div>
        </div>
       ) ): "no blogs are available"}
        </>
        
    )
}
