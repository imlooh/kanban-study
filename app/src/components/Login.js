import React, { useState, useEffect } from 'react';
import Workspace from './Workspace';
import landingapppreview from './static/images/landing-app-preview.png'
import './css/Login.css';

const Login = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [message, setMessage] = useState('');

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;

    if (!username || !password) {
      setMessage('All fields are required');
      return;
    }

    try {
      const response = await fetch('/api/users/login?' + new URLSearchParams({
        username: username,
        password: password
      }), {method: 'POST'});

      const data = await response.json();

      if (response.ok) {
        setMessage('Login successful!');
        localStorage.setItem('jwt', data.token);
      } else {
        setMessage('Error: ' + data.error);
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  if (isLoggedIn) {
    return (
      <Workspace></Workspace>
    );
  }
  
  else {
    return (
        // <div className="login-container">
        //   <h2>Login</h2>
        //   <form onSubmit={handleSubmit}>
        //     <div>
        //       <label>Username:</label>
        //       <input 
        //         type="text" 
        //         name="username" 
        //         value={formData.username} 
        //         onChange={handleChange} 
        //         required 
        //       />
        //     </div>
        //     <div>
        //       <label>Password:</label>
        //       <input 
        //         type="password" 
        //         name="password" 
        //         value={formData.password} 
        //         onChange={handleChange} 
        //         required 
        //       />
        //     </div>
        //     <button type="submit">Login</button>
        //   </form>
        //   {message && <p>{message}</p>}
        // </div>
        <div className="login-page">
          <header className="flex justify-between items-center p-5 border-b border-gray-300 shadow-lg">
          <div className="flex items-center space-x-5">
              <div className="text-2xl font-bold">kanban.study</div>
              <nav className="flex space-x-5">
                  <div className="relative group">
                      <a href="#" className="hover:text-gray-700">Home</a>
                      <div className="absolute left-0 mt-1 w-40 bg-white border border-gray-300 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <a href="#" className="block px-4 py-2 text-black hover:bg-gray-100">Sub-item 1</a>
                          <a href="#" className="block px-4 py-2 text-black hover:bg-gray-100">Sub-item 2</a>
                      </div>
                  </div>
                  <div className="relative group">
                      <a href="#" className="hover:text-gray-700">Features</a>
                      <div className="absolute left-0 mt-1 w-40 bg-white border border-gray-300 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <a href="#" className="block px-4 py-2 text-black hover:bg-gray-100">Sub-item 1</a>
                          <a href="#" className="block px-4 py-2 text-black hover:bg-gray-100">Sub-item 2</a>
                      </div>
                  </div>
                  <div className="relative group">
                      <a href="#" className="hover:text-gray-700">Pricing</a>
                      <div className="absolute left-0 mt-1 w-40 bg-white border border-gray-300 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <a href="#" className="block px-4 py-2 text-black hover:bg-gray-100">Sub-item 1</a>
                          <a href="#" className="block px-4 py-2 text-black hover:bg-gray-100">Sub-item 2</a>
                      </div>
                  </div>
              </nav>
          </div>
          <div className="flex items-center">
              <a href="#" className="hover:text-gray-700 mx-8 ">Login</a>
              <button className="bg-pink-200 px-4 py-2 rounded hover:bg-pink-300">Register</button>
          </div>
          </header>
          <main className="text-center my-16">
              <h1 className="text-6xl font-bold mb-4">Vocabulary, organized.</h1>
              <p className="text-2xl max-w-3xl mx-auto my-8">
                  Kanban.Study helps you organize and retain vocabulary effortlessly with a kanban-style board. Track your progress, review words, and master new languages with ease.
              </p>
              <div className="mx-auto w-3/4 md:w-1/2 lg:w-1/2 my-8">
                <img src={landingapppreview} alt="Screenshot of Kanban.Study" className="w-full h-auto rounded shadow-lg" />
            </div>
          </main>
        </div>
      );
  }
  
};

export default Login;