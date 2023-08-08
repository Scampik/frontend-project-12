// import { io } from "socket.io-client";
import { Server } from 'socket.io';

const io = new Server({
    cors: {
      origin: "http://localhost:3000"
    }
  });
  
  io.listen(4000);

const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:4000';

export const socket = io(URL);
