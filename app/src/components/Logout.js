import React from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
    localStorage.removeItem('jwt');
    const navigate = useNavigate();

    return(
        <div className='logout-container'>
            <h1>You have been logged out!</h1>
            {navigate('/login')}
        </div>
    )
}

export default Logout;