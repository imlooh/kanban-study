import React, { useState, useEffect } from 'react';
import Workspace from './Workspace';
import RelativeGroup from './common/RelativeGroup';
import landingapppreview from './static/images/landing-app-preview.png'
import * as Icons from 'react-bootstrap-icons';
import './css/Landing.css';

const Landing = (props) => {
  const [isDarkMode, setIsDarkMode] = useState(props.isDarkMode);
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('darkMode', !isDarkMode);
  };
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is already logged in (e.g., by checking JWT)
    const isLoggedIn = checkLoggedInStatus(); // Implement this function to check JWT
    setIsLoggedIn(isLoggedIn);
  }, []);

  const checkLoggedInStatus = () => {
    // Implement logic to check if user is logged in
    // For example, check if JWT exists in local storage or session storage
    const jwt = localStorage.getItem('jwt'); // Assuming JWT is stored in localStorage
    return !!jwt; // Return true if JWT exists, false otherwise
  };

  

  if (isLoggedIn) {
    return (
      <Workspace />
    );
  }
  
  else {
    return (
        
        <div className={'login-page ' + (isDarkMode ? 'dark' : '')}>
          <header className="flex justify-between items-center p-5 border-b border-gray-300 shadow-lg dark:bg-zinc-800 dark:text-white">
          <div className="flex items-center space-x-5">
              <div className="text-2xl font-bold small-caps -mt-1">kanban.study</div>
              <nav className="flex space-x-5">
                  <RelativeGroup main={{'href': '#', 'text': <>Features</>}} data={[
                    {'href': '#', 'text': <>✨ AI Assist</>},
                    {'href': '#', 'text': <><Icons.CalendarDay style={{display: 'inline-block'}}></Icons.CalendarDay> Boards</>},
                    {'href': '#', 'text': <><Icons.CardChecklist style={{display: 'inline-block'}}></Icons.CardChecklist> Sticky Notes</>},
                    {'href': '#', 'text': <>📝 Markdown</>}
                  ]} />
              </nav>
          </div>
          <div className="flex items-center">
              {!isDarkMode && <Icons.Lightbulb onClick={toggleDarkMode}></Icons.Lightbulb>}
              {isDarkMode && <Icons.LightbulbOff onClick={toggleDarkMode}></Icons.LightbulbOff>}
              <a href="#" className="hover:text-gray-700 mx-8">Login</a>
              <button className="bg-pink-200 px-4 py-2 rounded transition duration-300 hover:bg-pink-300 dark:text-black mx-4">Register</button>
              <button className="bg-green-200 px-4 py-2 rounded transition duration-300 hover:bg-pink-300 dark:text-black">Pay Me $6,000,000</button>
          </div>
          </header>
          <main className="text-center my-20 mt-40 mx-auto w-2/3">
              <section id='eye-catcher'>
                <h1 className="text-6xl font-bold mb-4">Vocabulary, organized.</h1>
                <p className="text-2xl max-w-3xl mx-auto my-8">
                    Kanban.Study helps you organize and retain vocabulary effortlessly with a kanban-style board. Track your progress, review words, and master new languages with ease.
                </p>
                <div className="mx-auto w-3/4 md:w-2/3 lg:w-2/3 my-9">
                  <img src={landingapppreview} alt="Screenshot of Kanban.Study" className="w-full h-auto rounded shadow-lg" />
                </div>
              </section>
              <section id='ai-assist'>
                  <h1 className="text-4xl font-bold mt-8 mb-4">Let AI help you study</h1>
                  <div className='bg-zinc-100 mt-9 text-left p-9 border-r-8 '>
                    <h2 className='text-2xl font-bold'>Ask about any language</h2>
                    <p className='text-lg mb-8'>Don't have time to make your own flashcards? Let AI do it for you.</p>
                    <img src='https://via.placeholder.com/1000x500' alt="Screenshot of Kanban.Study" className="w-full h-auto rounded shadow-lg" />
                  </div>
              </section>
          </main>
        </div>
      );
  }
  
};

export default Landing;