import { useState, useEffect } from 'react';

function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [message, setMessage] = useState('');

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

    return (
        <div className="login-container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Username:</label>
              <input 
                type="text" 
                name="username" 
                value={formData.username} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div>
              <label>Password:</label>
              <input 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                required 
              />
            </div>
            <button type="submit">Login</button>
          </form>
          {message && <p>{message}</p>}
        </div>
    )
}

export default Login;