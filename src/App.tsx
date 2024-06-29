import React from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter,Routes,Route } from 'react-router-dom';
import AllStudent from './components/student/AllStudent';
import Nav from './components/Home';
import Addstudent from './components/Add/Addstudent';
import EditStudent from './components/Edit/EditStudent';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Nav/>
     <ToastContainer />
     <Routes>
      <Route path='/' element={<AllStudent/>}/>
      <Route path='/add' element={<Addstudent/>}/>
      <Route path='/edit/:id' element={<EditStudent/>}/>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
