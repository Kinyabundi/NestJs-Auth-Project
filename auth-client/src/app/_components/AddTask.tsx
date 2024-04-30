'use client';

import { API_URL } from '@/env';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const AddTask = () => {
 const [title, setTitle] = useState('');
 const [description, setDescription] = useState('');
 const [scheduledTime, setScheduledTime] = useState('');
 const [loading, setLoading] = useState(false);
 const {data: session} = useSession();
 const router = useRouter()

 const resetForm = () => {
    setTitle('');
    setDescription('');
    setScheduledTime('');
 }

 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
     try {
        setLoading(true);
        const response = await fetch(`${API_URL}/task`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                description,
                scheduledTime,
                userId: session?.user?.id,
            }),
        });
        console.log(response);
        if(!response.ok){
           console.error('An error occurred while creating task', response.statusText);
        }
        toast.success('Task created successfully');
        resetForm();
        router.push('/success')
    } catch (err) {
        console.error(err);
    } finally{
        setLoading(false);
    
    }

 };

 return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Task Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="Enter task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="scheduledTime">
            Scheduled Time
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="scheduledTime"
            type="datetime-local"
            value={scheduledTime}
            onChange={(e) => setScheduledTime(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit" onClick={handleSubmit}
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
 );
};

export default AddTask;