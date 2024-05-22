import { useState, useEffect, useRef } from 'react';
import StickyNote from './StickyNote';

function Board(props) {
    const boundingRef = useRef(null);

    const [notes, setNotes] = useState(props.board.stickyNotes);
    
    const updateNotes = (note) => {
        props.board.stickyNotes.forEach((n) => {
            if(note.uuid == n.uuid) {
                n.width = note.width;
                n.height = note.height;
                //add color and text here later
            }
            setNotes(props.board.stickyNotes);
            props.updateBoardData(props.board);
        });
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Chinese</h1>
            <div className=" bg-blue-200 p-4 rounded-lg"  style={{width: '70vw', minHeight: '80vh', overflow: 'auto', position: 'absolute'}}> 
                {/* Note Cards */}
                {props.board.stickyNotes.map((note, index) => (
                <StickyNote key={index} note={note}></StickyNote>
                ))}
            </div>
        </div>
    )
}

export default Board;