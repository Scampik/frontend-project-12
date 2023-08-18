import React from 'react';

import ChannelForm from './components/ChannelForm.jsx';
import ChatForm from './components/ChatForm.jsx';

const ChatPage = () => (
  <>
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <ChannelForm />
        <ChatForm />
      </div>
    </div>
  </>
);

export default ChatPage;
