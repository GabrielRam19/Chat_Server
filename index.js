import Express  from "express";
import Morgan  from "morgan";
import {Server as SocketServer} from "socket.io";
import http from "http";
import cors from "cors";
import {PORT} from "./config.js";
import morgan from "morgan";

const app= Express();

const server= http.createServer(app);

const io=new SocketServer(server,{
    cors:{
        origin: "*",
    }
});

app.use(cors());
app.use(morgan('dev'));

io.on('connection', socket=>{
    socket.on('message',(msg)=>{
        socket.broadcast.emit('message', {body:msg.body, user:msg.user})
    })
})

server.listen(PORT);

console.log("Server iniciado en puerto: ",PORT);