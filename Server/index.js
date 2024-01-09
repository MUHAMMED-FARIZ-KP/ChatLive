const express=require('express');
require("dotenv").config();
const app=express();
const http=require("http");
const cors=require("cors")
const {Server}=require("socket.io")
let PORT = process.env.PORT;

app.use(cors());
const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        
        origin:"https://chat-live-react.vercel.app/",
        //origin:"http://localhost:3000",
        methods:["GET","POST"],
    },
});

io.on("connection",(socket)=>{
    console.log(`User connected: ${socket.id}`);
    socket.on("join_room",(data)=>{
        socket.join(data)
        console.log(`User with id: ${socket.id} joined room:${data}`)
    });

    socket.on("send_message",(data)=>{
        socket.to(data.room).emit("recieve_message",data);
    })
    socket.on("disconnect",()=>{
        console.log("User disconnected",socket.id);
    });
});

server.listen(PORT,()=>{
    console.log(`Server is Running on *:${PORT} `);
});