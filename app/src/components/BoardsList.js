import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Workspace() {
    const [data, setData] = useState({ boards: [] });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('jwt');
            if (!token) {
                setError('No token found');
                navigate('/login');
                return;
            }

            try {
                const response = await fetch(`/api/users/boards`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setData(data);
                } else {
                    setError('Failed to fetch data');
                    if (response.status === 401) {
                        // Redirect to login if not authorized
                        navigate('/login');
                    }
                }
            } catch (error) {
                setError('Error fetching data');
            }
        };

        fetchData();
    }, [navigate]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    const boardsList = data.boards.map((b) => (
        <div key={b._id} className='board-list-item'>{b.title}</div>
    ));

    return (
        <>
            {boardsList}
        </>
    );
}

export default Workspace;