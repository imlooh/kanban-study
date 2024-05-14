import React, { useRef } from 'react';

function BoardTitle(props) {
    const contentRef = useRef(null);

    const handleBlur = () => {
        
        props.board.title = contentRef.current.textContent;
        props.updateBoardData(props.board);
    };

    return(
        <h1 
            className='h1'
            id='boardTitle' 
            contentEditable 
            ref={contentRef} 
            onBlur={handleBlur}
            suppressContentEditableWarning={true}
            style={{
                marginTop: 1 + 'em',
            }}
            >
                {props.board.title}
        </h1>
    )
}

export default BoardTitle;