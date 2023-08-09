import React from 'react'

import Channel from './Channel.jsx'
import Chat from './Chat.jsx'

const ChatPage = () => {
  return (
    <>
      <div className='container h-100 my-4 overflow-hidden rounded shadow'>
        <div className='row h-100 bg-white flex-md-row'>
          <Channel />
          <Chat />
        </div>
      </div>
    </>
  )
}

export default ChatPage
