import { useState, useEffect } from 'react';

import BoardTitle from './BoardTitle';
import BoardsList from './BoardsList';
import TopNavigation from './TopNavigation';
import Board from './Board';

const MainContainer = (props) => {
    let defaultBoard = props.userData?.boards.filter(board => board?.uuid === props.userData.currentBoard)[0];

    const [currentBoardTitle, setCurrentBoardTitle] = useState(defaultBoard.title);

    const updateCurrentBoardTitle = (boardName) => {
        setCurrentBoardTitle(boardName);
    }
    
    //save when currentBoard (board title) changes!
    useEffect(() => {
        props.userData.boards.forEach((board) => {
            if(board.uuid == props.userData.currentBoard) {
                board.title = currentBoardTitle;
            }
        })
        
        props.updateUserData(props.userData);
    }, [currentBoardTitle]);

    return(
        <div className='MainContainer container'>
            <BoardTitle boardTitle={defaultBoard.title} currentBoardTitle={updateCurrentBoardTitle}/>
            <BoardsList />
            <TopNavigation />
            <Board board={defaultBoard}/>
        </div>
    )
}

export default MainContainer