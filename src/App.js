
import './App.css';
import Register from './pages/Register/Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import { useEffect } from 'react';
import { firebaseGetAuthorizedUser } from './firebase/utils';


function App() {
  useEffect(() => {
    firebaseGetAuthorizedUser()
  }, []);


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;