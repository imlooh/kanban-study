import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';

function Workspace() {
    const [data, setData] = useState({ boards: [] });
    const [loading, setLoading] = useState(true);
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
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const newBoard = async () => {
        const token = localStorage.getItem('jwt');
        if (token) {
            const response = await fetch(`/api/user/boards/new`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if(response.ok) {
                const data = await response.json();
                console.log(data);
                setData(data);
            }
        }
        
    };

    async function deleteBoard(boardId) {
        if(data.boards.length - 1 > 0) {
            const token = localStorage.getItem('jwt');
            if (token) {
                const response = await fetch(`/api/user/boards/delete?` + new URLSearchParams({
                    _id: boardId
                }), {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
        
                if(response.ok) {
                    const data = await response.json();
                    setData(data);
                }
            }
        }
    }

    if(loading) {
        return(
            <Spinner />
        );
    } else {
        if (error) {
            return <div>Error: {error}</div>;
        } else {
            
        const boardsList = !data.boards?.length ? 'No boards :( ' : data.boards?.map((b) => (
            <div key={b._id} className="bg-purple-400 text-white p-2 rounded-lg cursor-pointer boards-list-item">
                <div className='board-list-item' onAuxClick={() => deleteBoard(b._id)}>{b.title}</div>
            </div>
        ));

        return (
            <>
                <button onClick={newBoard}>New Board</button>
                {boardsList}
            </>
        );
        }
    }
}

const colors = [
    ['bg-red-200', 'bg-red-300', 'bg-red-400'],
    ['bg-pink-200', 'bg-pink-300', 'bg-pink-400'],
    ['bg-yellow-200', 'bg-yellow-300', 'bg-yellow-400'],
    ['bg-green-200', 'bg-green-300', 'bg-green-400'],
    ['bg-blue-200', 'bg-blue-300', 'bg-blue-400'],
    ['bg-purple-200', 'bg-purple-300', 'bg-purple-400'],
    ['bg-indigo-200', 'bg-indigo-300', 'bg-indigo-400'],
    ['bg-gray-200', 'bg-gray-300', 'bg-gray-400'],
  ];

export default Workspace;