
import { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import * as Icons from 'react-bootstrap-icons';

function StickyNote(props) {
    const note = props.note;

    const handleResize = (event, {node, size, handle}) => {
        note.width = size.width;
        note.height = size.height;
        props.updateNotes(note);
    }

    const handleDragStop = (e, data) => {
        note.left = data.x;
        note.top = data.y;
        props.updateNotes(note);
    };

    return(
        <Draggable
            bounds='parent'
            handle=".handle"
            onStop={(e, data) => handleDragStop(e, data)}
            cancel=".note-resize-handle"
            position={{x: note?.left || 0, y: note?.top || 0}}>
            <ResizableBox
                width={note?.width || 200}
                height={note?.height || 200}
                minConstraints={[100, 100]}
                resizeHandles={['se']}
                onResizeStop={handleResize}
                handle={
                    <Icons.ArrowsAngleExpand
                        className='note-resize-handle'
                        size={20}
                    />}
                className='handle sticky-note'
                style={
                    {
                        backgroundColor: note?.color || 'none'
                    }
                }>
                    <div dangerouslySetInnerHTML={{ __html: note?.front}} />
                </ResizableBox>
        </Draggable>
    )
}

export default StickyNote;