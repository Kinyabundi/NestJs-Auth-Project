'use client';

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import { API_URL } from "@/env";
import toast from "react-hot-toast";


const page = () => {
  const [loading, setLoading] = useState<boolean>();
  const { data: session } = useSession();

  const handleSubmit = async () => {
  
     try {
        setLoading(true);
        const response = await fetch(`${API_URL}/task`, {
            method: 'GET',
        });
        if(!response.ok){
           console.error('An error occurred while creating task', response.statusText);
        }
        const data = await response.json();
        console.log("all tasks", data)
        toast.success('Task fetched successfully');
    } catch (err) {
        console.error(err);
    } finally{
        setLoading(false);
    
    }
 };

 useEffect(() =>{
  handleSubmit()
},[])

  return (
    <div className="flex justify-center h-screen items-center">
      <h1 className="text-3xl font-bold"> Logged in Successfully</h1>
    </div>
  )
}

export default page