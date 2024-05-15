import { useState, useEffect } from 'react';

import BoardTitle from './BoardTitle';
import BoardsList from './BoardsList';
import TopNavigation from './TopNavigation';
import Board from './Board';

const MainContainer = (props) => {
    let defaultBoard = props.userData?.boards.filter(board => board?.uuid === props.userData.currentBoard)[0];

    const [currentBoardData, setCurrentBoardData] = useState(defaultBoard);
    const [userData, setUserData] = useState(props.userData);

    const updateCurrentBoardData = (board) => {
        console.log(board);
        setCurrentBoardData(board);
        
        props.userData.boards.forEach((board) => {
            if(board.uuid == props.userData.currentBoard) {
                board = currentBoardData;
                console.log(board);
            }
        })
        
        forceReload();
        props.updateUserData(props.userData);
    }

    const updateUserData = (newUserData) => {
        setUserData(newUserData);
        props.userData = userData;
        
        forceReload();
        props.updateUserData(props.userData);
    }

    const [reloadCounter, setReloadCounter] = useState(0);

    // Function to force reload sibling components
    const forceReload = () => {
        // Increment the reload counter to trigger a re-render
        setReloadCounter(prevCounter => prevCounter + 1);
    };


    return(
        <div className='MainContainer container'>
            <div className='left'>
            <BoardsList userData={props.userData} updateUserData={updateUserData}/>
            </div>
            <BoardTitle board={defaultBoard} updateBoardData={updateCurrentBoardData}/>
            <TopNavigation 
                board={defaultBoard} 
                updateBoardData={updateCurrentBoardData} 
                userData={props.userData}
                updateUserData={updateUserData}
                />
            <Board board={defaultBoard} updateBoardData={updateCurrentBoardData}/>
        </div>
    )
}

export default MainContainer