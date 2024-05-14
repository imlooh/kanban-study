import { useState } from 'react';

function BoardsList(props) {
    const [boards, setBoards] = useState(props.userData.boards);

    const boardsList = boards.map((board) => {
        return(
            <li class='list-group-item' key={board.uuid}>{board.title}</li>
        )
    });

    return(
        <ul className='list-group'>

            {boardsList}
        </ul>
    )
}

export default BoardsList