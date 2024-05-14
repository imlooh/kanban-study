import React, { useRef } from 'react';

function BoardTitle(props) {
    const contentRef = useRef(null);

    const handleBlur = () => {
        props.currentBoardTitle(contentRef.current.textContent);
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
                {props.boardTitle}
        </h1>
    )
}

export default BoardTitle;