import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import * as Icons from 'react-bootstrap-icons';

function TopNavigation(props) {
    const newNoteHandler = () => {
        
    };

    return(
        <div className='clearfix'>
            <ul className='nav nav-tabs'>
                <li className='nav-item' onClick={newNoteHandler}>
                    <a className='nav-link active'><Icons.PlusCircle></Icons.PlusCircle> Note</a></li>
                <li className='nav-item'>
                    <a className='nav-link active'><Icons.PlusCircle></Icons.PlusCircle> Board</a></li>
                <li className='nav-item'>
                    <a className='nav-link active'><Icons.Image></Icons.Image> Board Image</a></li>
                <li className='nav-item'>
                    <a className='nav-link active'><Icons.PaintBucket></Icons.PaintBucket> Board Color</a></li>
                <li className='nav-item'>
                    <a className='nav-link active'><Icons.Trash></Icons.Trash> Delete All</a></li>
                <li className='nav-item'>
                    <a className='nav-link active'><Icons.CardText></Icons.CardText> Flip All</a></li>
                <li className='nav-item'>
                    <a className='nav-link active'><Icons.CloudUpload></Icons.CloudUpload> Share</a></li>
                <li className='nav-item'>
                    <a className='nav-link active'><Icons.CloudDownload></Icons.CloudDownload> Import</a></li>
                <li className='nav-item'>
                    <a className='nav-link active'><Icons.HouseGear></Icons.HouseGear> Theme</a></li>
            </ul>
        </div>
    )
}

export default TopNavigation;