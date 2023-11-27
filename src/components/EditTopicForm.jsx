"use client"
import {useState} from 'react'

export default function EditTopicForm({id,title,description}) {
    const [newTitle,setNewTitle] = useState("");
    const [newDescription,setNewDescription] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        
    }
    return(
    <div>
        <form className="border border-blue-300 flex flex-col gap-2 mx-4">
        
            <input
                onChange={e => setNewTitle(e.target.value)}
                value={newTitle}
                className="px-4 py-2 mt-4 mx-5 border border-green-200 text-green-500"
                name="topic-title"
                placeholder="Topic Title"
                type="text"
             />
            <input
                onChange={e => setNewDescription(e.target.value)}
                value={newDescription}
                className="px-4 py-2 mt-2 mx-5 border border-green-200 text-green-500"
                name="description"
                placeholder="Topic Description"
                type="text"

            />
            <button className="bg-green-500 text-white font-semibold my-5 mx-5 py-2">Edit Topic</button>
        </form>
    </div>
    )
}