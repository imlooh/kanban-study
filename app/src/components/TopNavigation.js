import React, { useState } from 'react';
import * as Icons from 'react-bootstrap-icons';

function TopNavigation(props) {
    const [notes, setNotes] = useState(props.board.stickyNotes);
    const [boards, setBoards] = useState(props.userData.boards);

    const newNoteHandler = () => {
        props.board?.stickyNotes.push(
            {
                "uuid": crypto.randomUUID(),
                "front": "<h2>New Note</h2>",
                "back": "<h2>Back</h2>",
                "color": "pink",
                "width": 200,
                "height": 200,
                "top": 0,
                "left": 0
              }
        );

        setNotes(props.board.stickyNotes);
        props.updateBoardData(props.board);
    };

    const newBoardHandler = () => {
        props.userData?.boards.push(
            {
                "uuid": crypto.randomUUID(),
                "title": "Untitled Board",
                "stickyNotes": [],
                "position": 0,
                "boardColor": "#333",
                "boardImage": "none"
            }
        )

        setBoards(props.userData);
        props.updateUserData(props.userData);
    }

    const deleteAllNotesHandler = () => {
        //turn this into a popup prompt later!
        props.board.stickyNotes = [];
        setNotes(props.board.stickyNotes);
        props.updateBoardData(props.board);
        
    }

    return(
        <div className='clearfix'>
            <ul className='nav nav-tabs'>
                <li className='nav-item' onClick={newNoteHandler}>
                    <a className='nav-link active'><Icons.PlusCircle></Icons.PlusCircle> Note</a></li>
                <li className='nav-item' onClick={newBoardHandler}>
                    <a className='nav-link active'><Icons.PlusCircle></Icons.PlusCircle> Board</a></li>
                <li className='nav-item'>
                    <a className='nav-link active'><Icons.Image></Icons.Image> Board Image</a></li>
                <li className='nav-item'>
                    <a className='nav-link active'><Icons.PaintBucket></Icons.PaintBucket> Board Color</a></li>
                <li className='nav-item' onClick={deleteAllNotesHandler}>
                    <a className='nav-link active'><Icons.Trash></Icons.Trash> Delete All</a></li>
                <li className='nav-item'>
                    <a className='nav-link active'><Icons.CardText></Icons.CardText> Flip All</a></li>
                <li className='nav-item'>
                    <a className='nav-link active'><Icons.CloudUpload></Icons.CloudUpload> Share</a></li>
                <li className='nav-item'>
                    <a className='nav-link active'><Icons.CloudDownload></Icons.CloudDownload> Import</a></li>
                <li className='nav-item'>
                    <a className='nav-link active'><Icons.HouseGear></Icons.HouseGear> Theme</a></li>
            </ul>
        </div>
    )
}

export default TopNavigation;