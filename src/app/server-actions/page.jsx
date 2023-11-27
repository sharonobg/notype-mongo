import {getServerSession} from "next-auth/next";
import { headers } from "next/headers"

//import authOptions from "@/app/api/auth/[...nextauth]"


export default async (req, res) => {
    const session = await getServerSession(req, res)
    
    if (session) {
      console.log('session:',session)
      res.send({
        content:
          "This is protected content. You can access this content because you are signed in.",
      })
      return await res.json()
    } else {
      res.send({
        error: "You must be signed in to view the protected content on this page.",
      })
    }
       //const user = await getServerSession(authOptions);
       // console.log('session: ',user)
        return (
            <>
            
            <h1>Session</h1>
    <div className="flex p-2 flex-col place-items-center border border-blue-400 shadow-lg">
    {user?.user?.email ? (
        <>
        <div>You are logged in with {user?.user?.email}</div>
        <div>Your id is {user?.user?._id}</div>
        </>):(
        "Please log in" 
    )
    }</div>
            </>
        )
}