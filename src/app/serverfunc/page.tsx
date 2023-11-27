async function fetchServer(){                        
    const res = await fetch('http://localhost:3000/api/server-rt')
    
    await res.json();
    if(res.ok){
        console.log('serverfunc: ',res)
    }
    
   
}
export default fetchServer