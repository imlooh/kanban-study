import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Register from './Register';
import Login from './Login';
import Logout from './Logout';
import MainContainer from './MainContainer';
import './css/App.css';

//import 'bootstrap/dist/css/bootstrap.css';
//import './App.css';

function App() {
  //document.documentElement.setAttribute('data-bs-theme', 'dark');
  
  

  return (
    <div className="App">
      {/* <Header /> */}
      <Router>
        <Routes>
          <Route exact path='/' element={<Login /> } />
          <Route exact path='/logout' element={<Logout /> } />
          <Route exact path='/register' element={<Register />}></Route>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
