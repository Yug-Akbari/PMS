
import './App.css';
import Register from './pages/Register/Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Dummy from './pages/Dashboard/Dummy';
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
        <Route path='/dashboard' element={<Dashboard />} />
        {/* <Route path='/dashboard' element={<Dummy />} /> */}
        <Route path='/expense' element={<Expense />} />
        <Route path='/category' element={<Category />} />
        <Route path='/income' element={<Income />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;