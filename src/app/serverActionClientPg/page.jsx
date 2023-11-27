"use client"

import {useState} from 'react';
export default function ServerActionClientPg(){
    const [id,setId]= useState("");
    
    return(
        <div>
            <button 
            onClick={ async () => setId()}>
                Click me
            </button>
        </div>
    )

   }