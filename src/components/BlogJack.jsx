"use client"

import {useState,useEffect} from 'react';
export default function APITestBlogPage() {
    
    const [name,setName]=useState("");
    const [myblog,setMyblog]=useState("")

    useEffect( ()=>{
        fetch("/api/myblog")
        .then((res) => res.json())
        .then((data)=>setName(data))
        //.then((data)=> setMyblog(data.user));
    },[]);
    return(
        <>
        <div>
            <div>
                API Route from <span className="text-green-700">Client</span>
            </div>
            <div>Name:{name}</div>
            <div>Data:blogs here?</div>
        </div>
    </>
    )
}