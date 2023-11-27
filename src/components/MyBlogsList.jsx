
const getMyBlogs = async () => {
    
    try{
        const res = await fetch("http://localhost:3000/api/myblog",{
            cache: 'no-store'
        });
        if(!res.ok){
            throw new Error("Failed to fetch my blogs");
        }
        //console.log('res in route: ',res)
        return res.json();
    }catch(error){
        console.log("Error finding blogs",error)

    }
}

export default async function MyBlogsList() {
    
    const {myblog} = await getMyBlogs();
    //console.log({myblog})
    return(
       <>
      
       <h2>My Blogs</h2>
        {myblog?.length > 0 ? (myblog.map((myblog) => 
        <div key={myblog._id} className="flex flex-col place-items-center w-[50%] min-h-[50%]">
            <div className="flex border border-collapse border-blue-600 p-0 gap-2 my-0 items-start justify-between"> 
                <div className="flex flex-row items-start border border-amber-500">
                    <div className="border border-amber-500 w-[200px] py-2">{myblog.title}</div>
                    <div className="border border-amber-500 w-[200px] py-2">{myblog.description}</div>
                    <div className="border border-amber-500 w-[200px] py-2">{myblog.category}</div>
                </div>
                
            </div>
        </div>
       ) ): "no blogs are available"}
       <h2>My New blogs based on session</h2>
       {myblog?.length > 0 
       ? (myblog.map((myblog) => 
        <div key={myblog._id} className="flex flex-col place-items-center w-[50%] min-h-[50%]">
            <div className="flex border border-collapse border-blue-600 p-0 gap-2 my-0 items-start justify-between"> 
                <div className="flex flex-row items-start border border-amber-500">
                    <div className="border border-amber-500 w-[200px] py-2">{myblog.title}</div>
                    <div className="border border-amber-500 w-[200px] py-2">{myblog.description}</div>
                    <div className="border border-amber-500 w-[200px] py-2">{myblog.category}</div>
                </div>
                
            </div>
        </div>
       ) ): "no blogs are available"}
      
        </>
        
    )
}