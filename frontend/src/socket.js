// import { io } from "socket.io-client";

export default (socket) => {
  console.log('test___');

  socket.on('connect', () => {
    console.log(socket.connected, 'socket connect'); // true
  });
  socket.on('disconnect', () => {
    console.log(socket.connected, 'socket disconnect'); // false
  });

  //   socket.emit('newChannel', { name: "new channel" });
  //   socket.on('newChannel', (payload) => {
  //     console.log(payload) // { id: 6, name: "new channel", removable: true }
  //   });

  //   socket.on('removeChannel', (payload) => {
  //     console.log(payload); // { id: 6 };
  //   });

  // socket.on('newMessage', (payload) => {
  //     console.log(payload); // => { body: "new message", channelId: 7, id: 8, username: "admin" }
  //   });
};
