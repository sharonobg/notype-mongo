import Link from "next/link"
import RemoveBtn from "../components/RemoveBtn";
import {HiPencilAlt} from "react-icons/hi";

const getTopics = async () => {
    try{
        const res = await fetch("http://localhost:3000/api/topics",{
            cache: 'no-store'
        });
        if(!res.ok){
            throw new Error("Failed to fetch topics");
        }
        return res.json();
    }catch(error){
        console.log("Error finding topics",error)

    }
}

export default async function TopicList() {
    const {topics} = await getTopics();
    //console.log(topics)
    return(
        <>
        {topics.map(t => (
        <div key={t.index} className="flex flex-col place-items-center w-[50%] min-h-[50%]">
            <div className="flex border border-blue-600 p-5 gap-5 my-3 justify-between items-start "> 
                <div className="flex flex-col items-start">
                    <h2 className="text-2xl font-bold">{t.title}</h2>
                    <div>{t.description}</div>
                </div>
                <div className="flex gap-2">
                    <RemoveBtn id={t._id} />
                    <Link href={`/editTopic/${t._id}`}>
                        <HiPencilAlt size={24} />
                    </Link>
                </div>
            </div>
        </div>
        ))}
        </>
        
    )
}