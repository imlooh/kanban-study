import { useState, useRef } from 'react';
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

    const getNotes = notes.map((note) => {
        return(  
            <StickyNote updateNotes={updateNotes} boundingRef={boundingRef} key={note?.uuid} note={note}></StickyNote>
        )
    });

    return (
        <div ref={boundingRef} className='board border min-vh-70' style={
            {
                minHeight: 750 + 'px',
                position: 'absolute', 
                width: 'inherit',
                overflow: 'auto'
            }
        }>
        
            {getNotes}
        </div>
    )
}

export default Board;