import React, { useRef } from 'react';

function BoardTitle(props) {
    const contentRef = useRef(null);

    const handleBlur = async () => {
        props.board.title = contentRef.current.textContent;
        props.updateBoardData(props.board);

        await fetch(`/api/boards/board/title?` + new URLSearchParams({
            _id: '66442bbe916b5eec6a91b9e0',
            title: props.board.title
        }), {'method': 'POST'})
            .then(response => response.json())
            .then(response => console.log(response));
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