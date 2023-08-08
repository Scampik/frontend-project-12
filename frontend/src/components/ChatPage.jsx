import axios from 'axios';
import React, { useEffect, useState } from 'react';
import routes from '../routes.js';

import Channel from './Channel.jsx';
import Chat from './Chat.jsx';

const PrivatePage = () => {
  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channel />
        <Chat />
      </div>
    </div>
  )
};

export default PrivatePage;

 