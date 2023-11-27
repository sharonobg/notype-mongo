//import Image from 'next/image'
import connect from '../libs/mongodb'
import TopicsList from '../components/TopicList'
import CategoryList from '../components/CategoryList'
import BlogsList from '../components/BlogsList'
import BlogsListId from '../components/BlogsListId'
import {headers} from "next/headers"
import Link from 'next/link';
import TransactionsListId from '../components/TransactionsListId';
import {getServerSession} from "next-auth";
export default async function Home() {
  await connect()
  const session = await getServerSession();
  
  return (
    <>
    
    <main className="flex flex-col place-content-center text-center py-5">
    
    {session?.user?.email ? 
    (
      <>
      <div>Logged in as: {session?.user?.email}</div>
      <h1 className="py-5 text-4xl font-bold">Categories</h1>
      <CategoryList />
      <h2>Topics</h2>
      <TopicsList />
      <h2>BlogsList Server</h2>
      <BlogsList />
      <h2>Blogs List By Id</h2>
      <BlogsListId />
      <h2>Transaction list Client</h2>
      <TransactionsListId />
      

      </>
      ):(
        <Link href="/login">
        <h1>Please log in to see your Spending Plan</h1>
        </Link>
      )
      }
    </main>
    </>
  )
}
