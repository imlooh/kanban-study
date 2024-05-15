import * as Icons from 'react-bootstrap-icons';

function StickyNoteButtons(props) {
    const toggleNote = () => {

    };

    const editNote = () => {

    }

    return(
        <div className='sticky-note-buttons'>
            <div 
                className='flip-button'
                onClick={toggleNote}>
                <Icons.Eyeglasses />
            </div>
            <div 
                className='edit-button'
                onClick={editNote}>
                <Icons.PencilSquare />
            </div>
        </div>
    )
}

export default StickyNoteButtons