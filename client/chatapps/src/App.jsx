import React, { useEffect } from 'react'
import { useMemo } from 'react';
import { useState } from 'react';
import io from 'socket.io-client'

const App = () => {
  const [message, setMessage]= useState('')
  const [id,setid]=useState("")
  const [room, setRoom]=useState("")
  const [getmessages,setgetMessage]=useState([])
  const [group,setgroup]=useState()
  const socket = useMemo(()=>io("http://localhost:5000"),[]);
const handleform= (e)=>{
  e.preventDefault();
socket.emit("message",{message,room,group})
setMessage('')
}
const joinroomhandler=(e)=>{
e.preventDefault()
socket.emit("join-room",group)
console.log(`user joined in a room ${group}`)
setgroup("")

}

useEffect(() => {
  
console.log(getmessages)
    socket.on("connect", () => {
      console.log("Connected to server with ID:", socket.id);
      setid(socket.id)
    });


    socket.on("welcome", (message) => {
      console.log(message);
    });
 socket.on("recieve-message",(data)=>{
        console.log(data)
        setgetMessage((getmessages)=>[...getmessages,data])
      })
    

    return () => {
      socket.disconnect();
    };
  }, []); 

  return (
   <>
  <p>room ID: </p>
   {
    id
   }
   <form action="" onSubmit={handleform}>
  
    <div>
      <input  onChange= {(e=>setMessage(e.target.value))} value={message} type="text"  placeholder='your message'/>
<input  onChange= {(e=>setRoom(e.target.value))}  type="text"  placeholder='Room ID'/>
      <button type='submit'>send</button><br />
      
    </div>
   </form>

   <form action="" onSubmit={joinroomhandler}>
    <input value={group} onChange= {(e=>setgroup(e.target.value))}  type="text"  placeholder='group name'/>
      <button type='submit'>join</button>
   </form>

<div style={{ marginTop: '20px' }}>
        <h3>Messages:</h3>
        {getmessages.map((msg, index) => (
          <p key={index}>{msg.message || msg}</p>
        ))}
      </div>


   
   
   </>
  )
}

export default App;
