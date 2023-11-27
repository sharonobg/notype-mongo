"use client"

import React, {useState,useEffect} from 'react'
import {useSession}from 'next-auth/react';
import {useRouter} from 'next/navigation'
import {ToastContainer ,toast} from 'react-toastify';

const Edit = (ctx) => {
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [category,setCategory] = useState("");
    const {data:session,status} = useSession();
    const router = useRouter();

useEffect(() => {
    async function fetchBlog(){
        const id = ctx.params.id;
        const res = await fetch(`http://localhost:3000/api/blog/${id}`);
        const blog = await res.json();
        setTitle(blog.title);
        setDescription(blog.description);
        setCategory(blog.category);
    }
    fetchBlog()
},[])
if(status === 'loading'){
    return <p>Loading...</p>
}
if(status === 'unauthenticated'){
    
    return <p className="font-bold text-red-500">AccessDenied</p>
}
const handleSubmit= async (e) => {
    e.preventDefault();
    
    if(!title ||!description||!category){
        toast.error("Please fill in all the fields")
        return
    }
    try{
        const id = ctx.params.id;
        const body = {title,description,category}
        const res = await fetch(`http://localhost:3000/api/blog/${id}`,{
        headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${session?.user?.accessToken}`
        },
        method: "PUT",
        //body: JSON.stringify(body)
        body:JSON.stringify(body)
        
    })
    console.log('res after edit:',res)
    if(res.ok){
        console.log("Edit went through")
    }else{
        console.log("Edit failed")
    }

    const blog = await res.json();
    console.log(blog);
    router.push("/");
    }catch(error){
        console.log(error)
    }

    
}

return(
    <>
        <div className="flex flex-col w-full place-items-center border-l-orange-100">
            <h2>Edit Blog</h2>
            <form onSubmit={handleSubmit} className="flex flex-col flex-wrap gap-5 my-3">
                <input value={title} onChange={(e) => setTitle(e.target.value)}
                    className=""
                    name="blog-title"
                    placeholder="Blog Title"
                    type="text"
                />
                <textarea value={description} onChange={(e) => setDescription(e.target.value)}
                className="px-4 py-2 mt-4 mx-5 border border-green-200 text-green-500"
                name="description"
                placeholder="Description"
                type="text"
                />
                <select value ={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="food_in">Food-in</option>
                <option value="food_out">Food-out</option>
                <option value="mortgage">Mortgage</option>
                <option value="entertainment">Entertainment</option>
                </select>
                <button className="bg-blue-400 rounded-md p-3 text-white font-semibold" type="submit">Edit Blog</button>
            </form>
            
        </div>
        <ToastContainer />
    </>
)
}
export default Edit
