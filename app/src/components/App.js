import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Register from './Register';
import Login from './Login';
import Logout from './Logout';
import MainContainer from './MainContainer';

//import 'bootstrap/dist/css/bootstrap.css';
//import './App.css';

function App() {
  //document.documentElement.setAttribute('data-bs-theme', 'dark');
  
  

  return (
    <div className="App container">
      {/* <Header /> */}
      <Router>
        <Routes>
          <Route exact path='/login' element={<Login /> } />
          <Route exact path='/logout' element={<Logout /> } />
          <Route exact path='/register' element={<Register />}></Route>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
