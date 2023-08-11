import React, { createContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions as channelsActions } from "../slices/channelsSlice.js";

export const WSocketContext = createContext(null);

const WSocketProvider = ({ socket, children }) => {
  const emitNewMessage = (msg) => {
    // emit new message
    socket.emit("newMessage", msg);
  };
  const emitNewChannel = (name) => {
    socket.emit("newChannel", { name });
    // console.log("emitNewChannel");
  };

  const emitRemoveChannel = (id) => {
    // console.log("emit", id);
    socket.emit("removeChannel", { id });
  };

  const emitRenameChannel = (id, name) => {
    // console.log("emitRename");
    socket.emit("renameChannel", { id, name });
  };

  //слушатели в конце

  return (
    <WSocketContext.Provider
      value={{
        emitNewMessage,
        emitNewChannel,
        emitRemoveChannel,
        emitRenameChannel,
      }}
    >
      {children}
    </WSocketContext.Provider>
  );
};

export default WSocketProvider;
