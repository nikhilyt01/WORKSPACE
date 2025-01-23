import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [roomId, setRoomId] = useState(""); // Current room ID
  const [messages, setMessages] = useState([]); // All messages in the chat
  const [isJoined, setIsJoined] = useState(false); // Whether the user has joined a room
  const inputRef = useRef(); // Ref for the chat message input
  const roomRef = useRef(); // Ref for the room input
  const wsRef = useRef(); // Ref for the WebSocket connection

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    wsRef.current = ws;

    ws.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    return () => {
      ws.close();
    };
  }, []);

  const joinRoom = () => {
    const room = roomRef.current?.value;
    if (room) {
      wsRef.current.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomId: room,
          },
        })
      );
      setRoomId(room);
      setIsJoined(true);
      setMessages([]); // Clear previous messages when switching rooms
    } else {
      alert("Please enter a room ID to join!");
    }
  };

  const sendMessage = () => {
    const msg = inputRef.current?.value;
    if (msg && isJoined) {
      wsRef.current.send(
        JSON.stringify({
          type: "chat",
          payload: {
            message: msg,
          },
        })
      );
      inputRef.current.value = ""; // Clear the input after sending
    } else if (!isJoined) {
      alert("Please join a room first!");
    }
  };

  return (
    <div className="h-screen bg-gray-900 flex justify-center items-center">
      {/* Mobile App Container */}
      <div className="w-[360px] h-[640px] bg-gray-900 border-2 border-gray-800 
      rounded-lg shadow-lg flex flex-col overflow-hidden">
        {/* Header Section */}
        <div className="bg-blue-600 p-4 text-center">
          <h1 className="text-xl font-bold">
            {isJoined ? `Room: ${roomId}` : "Join a Room"}
          </h1>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-800">
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <div    
                key={index}
                className={`p-2 my-2 rounded ${
                  index % 2 === 0
                    ? "bg-blue-500 text-white self-start"
                    : "bg-green-500 text-white self-end"
                }`}
                style={{
                  maxWidth: "80%",
                  alignSelf: index % 2 === 0 ? "flex-start" : "flex-end",
                }}
              >
                {msg}
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400">No messages yet.</div>
          )}
        </div>

        {/* Input Section */}
        {isJoined ? (
          <div className="bg-gray-700 p-4 flex items-center">
            <input
              ref={inputRef}
              type="text"
              placeholder="Type your message..."
              className="flex-1 p-2 rounded bg-gray-800 text-white mr-2"
            />
            <button
              onClick={sendMessage}
              className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
            >
              Send
            </button>
          </div>
        ) : (
          <div className="bg-gray-700 p-4 flex items-center">
            <input
              ref={roomRef}
              type="text"
              placeholder="Enter Room ID"
              className="flex-1 p-2 rounded bg-gray-800 text-white mr-2"
            />
            <button
              onClick={joinRoom}
              className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
            >
              Join Room
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;











// import { useState ,useEffect,useRef} from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [message,setMessage] =useState(["hi every","heloo"]);
//   const inputref= useRef();
//   const wsRef = useRef();
 
//   useEffect(()=>{
//     const ws = new WebSocket("ws://localhost:8080");
//     ws.onmessage = (event) =>{
//       setMessage((m)=> [...m,event.data])

//     }
//     wsRef.current = ws;
    
//     ws.onopen =() =>{           // hardcoded joining room part
//       ws.send(JSON.stringify({
//         "type":"join",
//         "payload":{
//           "roomId":"red"
//         }
//       }))
//     }

//     return () =>{
//       ws.close()
//     }

//   },[])

//   return (
    
//     <div className="h-screen bg-black ">
//       <br /> <br /> <br />
//       <div className="h-[85vh]">
//         {message.map((msg) => <div className="m-8">
//           <span className="bg-white text-black rounded p-4 m-8 "> 
//             {msg}
//           </span> 
//         </div> )}

//       </div>
//       <div className="bg-white flex ">
//         <input ref={inputref} className="flex-1 "></input>

//         <button className="bg-purple-600 text-white" 
//          onClick={()=>{
//           const message = inputref.current?.value;
//           wsRef.current.send(JSON.stringify({
//           "type":"chat",
//             "payload":{
//               "message": message
//             }
//           }))
//         }}
//         >send message</button>
//       </div>

  
//     </div>
//   )
// }

// export default App
