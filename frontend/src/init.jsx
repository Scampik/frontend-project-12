import { Provider } from "react-redux";
import i18next from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { Provider as ProviderRoll, ErrorBoundary } from "@rollbar/react";
import Rollbar from "rollbar";
import React from "react";
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
    store.dispatch(channelsActions.addChannel(payload));
  });

  socket.on("removeChannel", (payload) => {
    store.dispatch(channelsActions.removeChannel(payload.id));
  });

  socket.on("renameChannel", (payload) => {
    store.dispatch(
      channelsActions.renameChannel({
        id: payload.id,
        changes: { name: payload.name },
      })
    );
  });

  const rollbarConfig = {
    accessToken: "308356585bae491da48fc6665de58833",
    captureUncaught: true,
    captureUnhandledRejections: true,
    environment: "production",
  };

  const rollbar = new Rollbar(rollbarConfig);
  //config={rollbarConfig} v Proveder
  //<ErrorBoundary>
  return (
    <React.StrictMode>
      <ProviderRoll config={rollbar}>
        <Provider store={store}>
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
      </ProviderRoll>
    </React.StrictMode>
  );
};

export default init;
