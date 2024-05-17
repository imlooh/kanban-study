import React from 'react';

function Logout() {
    localStorage.removeItem('jwt');

    return(
        <div className='logout-container'>
            <h1>You have been logged out!</h1>
        </div>
    )
}

export default Logout;