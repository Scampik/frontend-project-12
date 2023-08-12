import store from "./slices/index";
import { actions as channelsActions } from "./slices/channelsSlice.js";
import { actions as messagesActions } from "./slices/messagesSlice.js";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ru from "./locales/ru.js";

const init = (socket) => {
  i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      resources: { ru },
      lng: "ru",
    });

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
    // console.log(payload, "payloadRemove");
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

export default init;
