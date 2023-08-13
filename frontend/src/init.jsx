import { Provider } from "react-redux";
import i18next from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { ErrorBoundary } from "@rollbar/react";
import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const rollbarConfig = {
    accessToken: "POST_CLIENT_ITEM_ACCESS_TOKEN",
    captureUncaught: true,
    captureUnhandledRejections: true,
    environment: "production",
  };

  const successAddChannel = (payload) => {
    store.dispatch(channelsActions.addChannel(payload));
    store.dispatch(channelsActions.setCurrentChannel(payload));
    toast(i18n.t("toast.createChannel"));
  };

  const successRemoveChannel = (payload) => {
    store.dispatch(channelsActions.removeChannel(payload.id));
    store.dispatch(
      channelsActions.setCurrentChannel({
        name: "general",
        removable: false,
        id: 1,
      })
    );
    toast(i18n.t("toast.removeChannel"));
  };

  socket.on("connect", () => {
    console.log(socket.connected, "socket connect");
  });
  socket.on("disconnect", () => {
    console.log(socket.connected, "socket disconnect");
  });

  socket.on("newMessage", (payload) => {
    store.dispatch(messagesActions.addMessage(payload));
  });

  socket.on("newChannel", (payload) => {
    successAddChannel(payload);
  });

  socket.on("removeChannel", (payload) => {
    successRemoveChannel(payload);
  });

  socket.on("renameChannel", (payload) => {
    store.dispatch(
      channelsActions.renameChannel({
        id: payload.id,
        changes: { name: payload.name },
      })
    );
    toast(i18n.t("toast.renameChannel"));
  });

  return (
    <React.StrictMode>
      <Provider store={store} config={rollbarConfig}>
        <ErrorBoundary>
          <WSocketProvider socket={socket}>
            <AuthProvider>
              <I18nextProvider i18n={i18n}>
                <App />
              </I18nextProvider>
            </AuthProvider>
          </WSocketProvider>
        </ErrorBoundary>
      </Provider>
    </React.StrictMode>
  );
};

export default init;
