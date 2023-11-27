import connect from '../../libs/mongodb'
import {headers} from "next/headers"
import BlogJack from "../../components/BlogJack"
await connect;
export default async function MyPlan() {
  const resp = await fetch("http://localhost:3000/api/blog",{
    method: "GET",
    headers: headers(),
})
.then((res)=> res.json()
);
  return (
    <main className="flex flex-col place-content-center text-center">
    <h1 className="py-5 text-4xl font-bold">My Stuff</h1>
    <div>Name from Server: {resp?.email}</div>
    <h2>BlogsListMyBlogs</h2>

    <div>Response:{resp?.name}</div>
    <div>Blog</div>
     <BlogJack />
    </main>
  )
}
