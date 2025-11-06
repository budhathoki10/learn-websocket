const websocket= require("ws")
const server= new websocket.server({port:3000})

server.on("connection",(socket)=>{
console.log("client connected")
socket.send("hello world")
socket.on("message",(message)=>{
    console.log("messages")
    socket.send(message)
})
})

const socket= new websocket("https://localhost:3000")
socket.onmessage=(event)=>{
    console.log(event.data)
}

console.log("websokect is running at ws://localhost:3000 ")