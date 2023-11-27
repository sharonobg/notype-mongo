import Link from "next/link"
import {headers} from "next/headers"
import {HiPencilAlt} from "react-icons/hi";
import AddCategory from '../../components/AddCategory';

const getCategories = async () => {
    
    try{
        const res = await fetch("http://localhost:3000/api/category",{
        method: "GET",
        headers: headers()
    });
    if(!res.ok){
        throw new Error("Failed to fetch categories");
    }
    
    return res.json()
}catch (error){
    console.log("Error finding categories",error)
}
}
export default async function CategoriesList() {
    const {categories} = await getCategories();
    console.log('categories: ',categories)
    return(
       <>
      {/*<div>Logged in as: {resp?.user?.email}</div>*/}
       <AddCategory />
       <div className="py 5 my-4 flex flex-col place-items-center w-[50%] min-h-[50%] text-blue-400 underline"><Link className="p-0" href='/category-list'>
                        Add a category
                    </Link></div>
        {categories?.length > -1 ? (categories.map((category) => 
        <div key={category._id} className=" flex flex-col place-items-center w-[50%] min-h-[50%]">
            <div className="flex border border-collapse border-blue-600 p-0 gap-2 my-0 items-start justify-between"> 
                <div className="bg-white px-2 flex flex-row items-start border border-amber-500">
                    <div className="px-2 w-[200px] py-2">{category.title}</div>
             {/*       <select value ={category._id} onChange={(e) => setCategoryId(e.target.value)}>
                <option value={category._id}>{category.title}</option>
                </select>*/}
                <select value ={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="food_in">Food-in</option>
                <option value="food_out">Food-out</option>
                <option value="mortgage">Mortgage</option>
                <option value="entertainment">Entertainment</option>
                </select>
                </div>

                {/*<select value ={category._id} onChange={(e) => setCategoryId(e.target.value)}>
                <option value={category._id}>{category.title}</option>
                </select>*/}
                <div className="flex gap-2 p-2">
                    {/*<RemoveCategory id={category._id} />*/}
                    <Link className="p-0" href={`/addCategory/edit/${category._id}`}>
                        <HiPencilAlt size={24} />
                    </Link>
                </div>
            </div>
        </div>
       ) ): "no categories are available"}
        </>
        
    )
}