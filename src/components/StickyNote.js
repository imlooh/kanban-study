
import { useRef } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import * as Icons from 'react-bootstrap-icons';

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
            <ResizableBox
                width={note?.width || 200}
                height={note?.height || 200}
                minConstraints={[100, 100]}
                handle={<Icons.TextareaResize></Icons.TextareaResize>}
                className='handle sticky-note'
                style={
                    {
                        backgroundColor: note?.color || 'none',
                    }
                }>
                    <div dangerouslySetInnerHTML={{ __html: note?.front}} />
                </ResizableBox>
        </Draggable>
    )
}

export default StickyNote;