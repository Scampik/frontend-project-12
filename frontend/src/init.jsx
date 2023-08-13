import { Provider } from "react-redux";
import i18next from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import React from "react";

import { actions as channelsActions } from "./slices/channelsSlice.js";
import { actions as messagesActions } from "./slices/messagesSlice.js";
import store from "./slices/index";
import App from "./components/App";
import AuthProvider from "./contexts/AuthContext";
import WSocketProvider from "./contexts/WScontext";
import resources from "./locales/index.js";

const init = async (socket) => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      resources,
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

  return (
    <Provider store={store}>
      <WSocketProvider socket={socket}>
        <AuthProvider>
          <I18nextProvider i18n={i18n}>
            <App />
          </I18nextProvider>
        </AuthProvider>
      </WSocketProvider>
    </Provider>
  );
};

export default init;
