import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login.jsx';
import MainPage from './components/MainPage';
import PageNotFound from './components/PageNotFound.jsx';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} >
            <Route element={<div>No page is selected.</div> } />
            <Route path="Login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;