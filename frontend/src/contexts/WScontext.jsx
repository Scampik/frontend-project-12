import React, { createContext } from 'react'

export const WSocketContext = createContext(null)

const WSocketProvider = ({ children }) => {
  const sendNewMessage = () => {
    console.log('sendMessage')
  }
  const sendNewChannel = () => {
    console.log('sendMessage')
  }
  const sendRemoveChannel = () => {
    console.log('sendMessage')
  }
  const sendRenameChannel = () => {
    console.log('sendMessage')
  }

  return (
    <WSocketContext.Provider value={{
      sendNewMessage,
      sendNewChannel,
      sendRemoveChannel,
      sendRenameChannel
    }}
    >
      {children}
    </WSocketContext.Provider>
  )
}

export default WSocketProvider
