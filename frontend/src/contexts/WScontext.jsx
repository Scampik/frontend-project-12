import React, { createContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions as channelsActions } from "../slices/channelsSlice.js";

export const WSocketContext = createContext(null);

const WSocketProvider = ({ socket, children }) => {
  const dispatch = useDispatch();
  const { currentChannel } = useSelector((state) => state.channels);

  // console.log("lol");
  const sendNewMessage = () => {
    console.log("sendMessage");
  };
  const sendNewChannel = (name) => {
    socket.emit("newChannel", { name });
    console.log("sendNewChannel");
  };

  const sendRemoveChannel = (id) => {
    socket.emit("removeChannel", { id });
    socket.on("renameChannel", (payload) => {
      console.log(payload); // { id: 7, name: "new name channel", removable: true }
      dispatch(channelsActions.removeChannel(payload.id));
    });
  };
  const sendRenameChannel = () => {
    console.log("sendMessage");
  };

  //слушатели в конце
  socket.on("newChannel", (payload) => {
    console.log(payload, "dobavlen channel!");
    dispatch(channelsActions.addChannel(payload));
    dispatch(
      channelsActions.setCurrentChannel({
        id: payload.id,
        name: payload.name,
      })
    );
  });

  return (
    <WSocketContext.Provider
      value={{
        sendNewMessage,
        sendNewChannel,
        sendRemoveChannel,
        sendRenameChannel,
      }}
    >
      {children}
    </WSocketContext.Provider>
  );
};

export default WSocketProvider;
