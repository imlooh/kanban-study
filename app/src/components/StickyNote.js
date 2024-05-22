import { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import './css/App.css';

function StickyNote(props) {
    const { note, updateNotes } = props;
    const [position, setPosition] = useState({ x: note.left, y: note.top });
    const [size, setSize] = useState({ width: note.width, height: note.height });

    useEffect(() => {
        setPosition({ x: note.left, y: note.top });
        setSize({ width: note.width, height: note.height });
    }, [note.left, note.top, note.width, note.height]);

    const handleResize = (event, { size }) => {
        setSize({ width: size.width, height: size.height });
        const updatedNote = { ...note, width: size.width, height: size.height };
        //updateNotes(updatedNote);
    };

    const handleDragStop = (e, data) => {
        if(data.x < 0) {
            data.x = 0;
        }

        if(data.y < 0) {
            data.y = 0;
        }

        setPosition({ x: data.x, y: data.y });
        const updatedNote = { ...note, left: data.x, top: data.y };
        //updateNotes(updatedNote);
    };

    return (
        <Draggable
            position={position}
            onStop={handleDragStop}
            cancel={'.react-resizable-handle'}
            style={{position: 'relative'}}
        >
            <div style={{ width: size.width, height: size.height }}>
                <ResizableBox
                    width={size.width}
                    height={size.height}
                    minConstraints={[100, 100]} // Minimum size constraints
                    onResizeStop={handleResize} // Use onResizeStop for smoother resizing
                    resizeHandles={['se']} // Add resize handle at the southeast corner
                    className={`${note.color} p-2 rounded-lg`}
                >
                    <div className="w-full h-full flex items-center justify-center">
                        <span className="text-3xl sticky-note-front" dangerouslySetInnerHTML={{ __html: note?.front }}></span>
                        <span className="text-3xl sticky-note-back" dangerouslySetInnerHTML={{ __html: note?.back }}></span>
                    </div>
                </ResizableBox>
            </div>
        </Draggable>
    );
}

export default StickyNote;
