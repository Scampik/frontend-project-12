import axios from 'axios';
import React, { useEffect, useState } from 'react';
import routes from '../routes.js';
// import { getPosts } from ''

import Channel from './Channel.jsx';
import Chat from './Chat.jsx';

// const getAuthHeader = () => {
//   const userId = JSON.parse(localStorage.getItem('userId'));

//   if (userId && userId.token) {
//     return { Authorization: `Bearer ${userId.token}` };
//   }

//   return {};
// };

const PrivatePage = () => {
  // const [content, setContent] = useState('');
  // useEffect(() => {
  //   const fetchContent = async () => {
  //     const { data } = await axios.get(routes.usersPath(), { headers: getAuthHeader() });
  //     setContent(data.channels);
  //   };

  //   fetchContent();
  // }, []);
  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channel />
        <Chat />
      </div>
    </div>
  )
};
// {content && content.map((chan) => <div>{chan.name}</div>)}
export default PrivatePage;

 // {posts.map((post) => {
  //   return <div> post</div>
  // })}
//   const posts = useSelector(getPosts); // ot pererendera