
import './App.css';
import Register from './pages/Register/Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Category from './pages/category/Category';
import Expense from './pages/Expense/Expense';
import Income from './pages/Income/Income';
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
        <Route path='/expense' element={<Expense />} />
        <Route path='/category' element={<Category />} />
        <Route path='/income' element={<Income />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;