"use client"

import {useState,useEffect} from "react";
import {useRouter} from "next/navigation";

export default function AddTopic() {
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!title || !description){alert("Title and description req")
        return;
        }
        try{
            const res = await fetch('http://localhost:3000/api/topics',{
                method:'POST',
                headers:
                {
                    "Content-type":"application/json"
                },
                body: JSON.stringify({title,description}),
            });
            if(res.ok){
                router.push('/');
            }
            else{
                throw new Error("Failed to add a topic")
            }
        }catch(error){
            console.log(error);
        }
    }
    return(
        <form onSubmit={handleSubmit} className="border border-blue-300 flex flex-col gap-2 mx-4">
        
            <input onChange={(e) => setTitle(e.target.value)}
                className="px-4 py-2 mt-4 mx-5 border border-green-200 text-green-500"
                name="topic-title"
                placeholder="Topic Title"
                type="text"
                
            />
            <input
                onChange={(e) => setDescription(e.target.value)}
                className="px-4 py-2 mt-2 mx-5 border border-green-200 text-green-500"
                name="description"
                placeholder="Topic Description"
                type="text"
                
            />
            <button type="submit" className="bg-green-500 text-white font-semibold my-5 mx-5 py-2">Add Topic</button>
        </form>

    )
}