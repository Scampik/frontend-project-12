import store from "./slices/index";
import { actions as channelsActions } from "./slices/channelsSlice.js";
import { actions as messagesActions } from "./slices/messagesSlice.js";

const ListeningSocket = (socket) => {
  socket.on("connect", () => {
    console.log(socket.connected, "socket connect"); // true
  });
  socket.on("disconnect", () => {
    console.log(socket.connected, "socket disconnect"); // false
  });

  socket.on("newMessage", (payload) => {
    // console.log(payload, "newPayload");
    store.dispatch(messagesActions.addMessage(payload));
  });

  socket.on("newChannel", (payload) => {
    // console.log(payload, "newPayload");
    store.dispatch(channelsActions.addChannel(payload));
  });
  socket.on("newChannel", (payload) => {
    // console.log(payload, "newPayload");
    store.dispatch(channelsActions.setCurrentChannel(payload));
  });

  socket.on("removeChannel", (payload) => {
    // console.log(payload, "payloadRemove");
    store.dispatch(channelsActions.removeChannel(payload.id));
  });

  socket.on("removeChannel", (payload) => {
    console.log(payload, "payloadRemove");
    store.dispatch(
      channelsActions.setCurrentChannel({
        name: "general",
        removable: false,
        id: 1,
      })
    );
  });

  // subscribe rename channel
  socket.on("renameChannel", (payload) => {
    store.dispatch(
      channelsActions.renameChannel({
        id: payload.id,
        changes: { name: payload.name },
      })
    );
  });
};

export default ListeningSocket;
