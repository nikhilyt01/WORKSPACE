
'use client';

import { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { http_backend } from '@/config';
import axios from 'axios';
import axiosWithAuth from '@/components/axioswithAuth';
import { LogOut } from 'lucide-react';
import { UnAuth } from '@/components/unAuthpage';

type Room = {
  id: number;
  slug: string;
  createdat: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const [roomName, setRoomName] = useState('');
  const [joinRoomName, setJoinRoomName] = useState('');
  const [rooms, setRooms] = useState<Room[]>([]); // This should be hydrated from server via useEffect if needed
  const [authstatus,setAuthstatus] =useState<"loading"|"unauth">("loading")

  const api=axiosWithAuth();  // made api with same baseURL and Authorization

  useEffect(()=>{
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if(!token){
      setAuthstatus("unauth");
      return;
    }
    const fetchData= async()=>{
      try{
      const res= await api.get("/user")
      setRooms(res.data.room);
      }catch(e){
        toast.error("Failed to Load Room!",{duration:2000})
      }
    }
    fetchData();

  },[]);

  const createRoom = async () => {
    try {
      if(!roomName.trim()){
        return;
      }
      const res = await api.post("/room", { name:roomName });
      toast.success('Room created successfully!');
      setRooms([...rooms, res.data.room]);
      setRoomName('');
    } catch (err: any) {
      toast.error('Failed to create room');
    }
  };

  const joinRoom = () => {
    if (!joinRoomName.trim()) return;
    router.push(`/canvas/${joinRoomName}`);
  };

  const handleDelete = async (id: number) => {
    const confirmed = confirm('Are you sure you want to delete this room?');
    if (!confirmed) return;
    try {
      await api.delete(`/room/${id}`);
      toast.success('Room deleted');
      setRooms(rooms.filter(r => r.id !== id));
    } catch {
      toast.error('Failed to delete room');
    }
  };

  //if(authstatus=="unauth") return <UnAuth/>

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">

      <div className="flex items-center justify-between ">
         <div className="text-4xl font-bold mb-8 text-center">Slate.io</div>
         <div className=" p-2 mb-5 mr-2 rounded-full bg-red-500 hover:bg-red-600  active:scale-95 hover:scale-105 "
           onClick={()=>{router.push("/"); localStorage.removeItem("token")}}><LogOut/></div>
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-8 mb-8">
        <div className="bg-blue-800 rounded-lg p-6 w-full md:w-80 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Create Room</h2>
          <input
            type="text"
            value={roomName}
            onChange={e => setRoomName(e.target.value)}
            placeholder="Enter Room Name"
            className="w-full p-2 rounded bg-gray-800 border border-gray-600 mb-4"
          />
          <button
            onClick={createRoom}
            className="w-full py-2 bg-white text-black rounded font-semibold hover:scale-105 active:scale-95 hover:bg-gray-200 transition"
          >
            Create Room
          </button>
        </div>

        <div className="bg-blue-800 rounded-lg p-6 w-full md:w-80 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Join Any Room</h2>
          <input
            type="text"
            value={joinRoomName}
            onChange={e => setJoinRoomName(e.target.value)}
            placeholder="Enter Room ID"
            className="w-full p-2 rounded bg-gray-800 border border-gray-600 mb-4"
          />
          <button
            onClick={joinRoom}
            className="w-full py-2 bg-white text-black rounded font-semibold hover:scale-105 active:scale-95 hover:bg-gray-200 transition"
          >
            Join Room
          </button>
        </div>
      </div>

      <div className="bg-blue-900 rounded-lg p-6 overflow-x-auto max-w-2xl mx-auto shadow-xl">
        <h2 className="text-2xl font-semibold mb-4">Your Available Rooms</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="text-sm text-gray-300 uppercase border-b border-gray-600">
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Room Name</th>
              <th className="py-2 px-4">Created At</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map(room => (
              <tr key={room.id} className="border-b border-gray-700 hover:bg-gray-800 transition">
                <td className="py-2 px-4">{room.id}</td>
                <td className="py-2 px-4">{room.slug}</td>
                <td className="py-2 px-4">{room.createdat.slice(0, 10)}</td>
                <td className="py-2 px-4 flex gap-2">
                  <button
                    onClick={() => router.push(`/canvas/${room.id}`)}
                    className="bg-white text-black py-1 px-3 rounded hover:bg-gray-200  
                                   hover:scale-105       /* Bubble/zoom effect */
                                   active:scale-95       /* Click effect */
                                    "
                  >
                    Join 
                  </button>
                  <button
                    onClick={() => handleDelete(room.id)}
                    className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700 hover:scale-105 active:scale-95 hover:shadow-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
