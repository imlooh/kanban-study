import { useRef } from 'react';
import StickyNote from './StickyNote';

function Board(props) {
    const boundingRef = useRef(null);
    
    const getNotes = props.board.stickyNotes.map((note) => {
        return(  
            <StickyNote boundingRef={boundingRef} key={note?.uuid} note={note}></StickyNote>
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