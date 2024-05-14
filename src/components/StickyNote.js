
import { useRef } from 'react';
import Draggable from 'react-draggable';

function StickyNote(props) {
    const note = props.note;

    const handleDrag = (e, ui) => {
        if(props.boundingRef.current) {
            props.boundingRef.current.scrollLeft -= ui.deltaX;
            props.boundingRef.current.scrollTop -= ui.deltaY;
        }
    }

    return(
    <Draggable
        bounds='parent'
        handle=".handle"
        onDrag={handleDrag}>  
        <div className='float-start handle sticky-note'
            style={
                {
                    backgroundColor: note?.color || 'none',
                    width: 200 + 'px',
                    height: 200 + 'px',
                    position: 'relative'
                }
            }
            dangerouslySetInnerHTML={{ __html: note?.front}}
        ></div>
    </Draggable>
    )
}

export default StickyNote;