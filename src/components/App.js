import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Header from './Header';
import MainContainer from './MainContainer';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function App() {
  document.documentElement.setAttribute('data-bs-theme', 'dark');
  
  //returns a skeleton of data for a new user
  const createUserData = () => {
    let newUuid = crypto.randomUUID();
    return( 
      {
        "boards": [
          {
            "uuid": newUuid,
            "title": "Untitled Board",
            "stickyNotes": [
              {
                "uuid": crypto.randomUUID(),
                "front": "<h2>Test</h2>",
                "back": "<h2>Test Back</h2>",
                "color": "pink",
                "width": 200,
                "height": 200,
                "top": 200,
                "left": 0
              },
              {
                "uuid": crypto.randomUUID(),
                "front": "<h2>Test 2</h2>",
                "back": "<h2>Test Back</h2>",
                "color": "pink",
                "width": 200,
                "height": 200,
                "top": 0,
                "left": 0
              }
            ],
            "position": 0,
            "boardColor": "#333",
            "boardImage": "none"
          }
        ],
        "theme": "dark",
        "currentBoard": newUuid,
        "language": "en"
      }
    )
  }
  
  //load user data
  function initUserData() {
    //if we don't have any, make some and save it
    if(!localStorage.getItem('userData')) {
      localStorage.setItem('userData', JSON.stringify(createUserData()))
    } 
    
    //return the data
    return JSON.parse(localStorage.getItem('userData'));
  }

  //global data state
  const [userData, setUserData] = useState(initUserData());

  //handler that we pass to other components to manage the user data
  const updateUserData = (newUserData) => {
    console.log('updateUserData');
    localStorage.setItem('userData', JSON.stringify(userData));
    setUserData(newUserData);
  }

  //save the data if it changes
  useEffect(() => {

  }, [userData])

  return (
    <div className="App container">
      {/* <Header /> */}
      <Router>
        <Routes>
          <Route exact path='/' element={<MainContainer userData={userData} updateUserData={updateUserData} />} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
