const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  credentials: true
};

app.use(cors(corsOptions));


const server = http.createServer(app);

const io = new Server(server,{
    cors: {
     origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  credentials: true
    }
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

io.on("connection", (socket) => {
  console.log("User connected");
  console.log("user id",socket.id)
  // socket.broadcast.emit("welcome", `warm  welcome to user :${socket.id}`)
  socket.on("message",({message,room})=>{
    console.log("data")
     io.to(room).emit("recieve-message",message)
    
   
  })
  socket.on("join-room",(group)=>{
   socket.join(group)
  })

  
  // socket.emit("welcome", `warm  welcome to user :${socket.id}`)
  socket.on("disconnected",(socket)=>{
    console.log("user disconnected",socket.id)
  })
});

server.listen(5000, () => {
  console.log("Server is running on port 5000");
});
