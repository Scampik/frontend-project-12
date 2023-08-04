import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login.jsx';
import MainPage from './components/MainPage';
import PageNotFound from './components/PageNotFound.jsx';
import { Button, Navbar, Nav } from 'react-bootstrap';
import { userState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPostThunk } from './api/getPost.js';
import { getPosts } from ''

const App = () => {
  const dispatch = useDispatch();
  const posts = useSelector(getPosts); // ot pererendera

  useEffect(() => {
    dispatch(getPostThunk())
  }, []);

  // {posts.map((post) => {
  //   return <div> post</div>
  // })}

  return (
    <BrowserRouter>
     <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to="Login">Hexlet</Navbar.Brand>
      </Navbar>
      <Routes>
        <Route path="/" element={<Login />} >
            <Route element={<div>No page is selected.</div> } />
            <Route path="Login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;