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
       <AddCategory />
       
       <div className="py 5 my-4 flex flex-col place-items-center w-[50%] min-h-[50%] text-blue-400 underline">
                    
        {categories?.length > -1 ? (categories.map((category) => 
        <select value ={category} onChange={(e) => setCategory(e.target.value)}>
        <option value={category._id}>{category.title}</option></select>
        )):("no category")}
        
        </div>
       
        </>
        
    )
}