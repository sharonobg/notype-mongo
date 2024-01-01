//import Image from 'next/image'
import connect from '../libs/mongodb'
//import TopicsList from '../components/TopicList'
//import CategoryList from '../components/CategoryList'
import BlogsList from '../components/BlogsList'
//import {headers} from "next/headers"
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
      <h1>Transaction List</h1>
      <BlogsList />
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
