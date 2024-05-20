import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Register from './Register';
import Landing from './Landing';
import Logout from './Logout';
import Login from './Login';
import MainContainer from './MainContainer';
import './css/App.css';

//import 'bootstrap/dist/css/bootstrap.css';
//import './App.css';

function App() {
  //document.documentElement.setAttribute('data-bs-theme', 'dark');
  
  const [isDarkMode, setIsDarkMode] = useState(false);

  const checkDarkMode = () => {
    if(localStorage.getItem('darkMode') == 'undefined' || localStorage.getItem('darkMode') == 'disabled') {
      setIsDarkMode(true)
      localStorage.setItem('darkMode', true);
    } else {
      setIsDarkMode('disabled')
      localStorage.setItem('darkMode', isDarkMode);
    }

    return isDarkMode;
  }

  return (
    <div className="App">
      {/* <Header /> */}
      <Router>
        <Routes>
          <Route exact path='/' element={<Landing /> } isDarkMode={checkDarkMode} />
          <Route exact path='/logout' element={<Logout /> } />
          <Route exact path='/login' element={<Login /> } />
          <Route exact path='/register' element={<Register />}></Route>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
