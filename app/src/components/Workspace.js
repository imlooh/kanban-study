import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Board from './Board';
import BoardsList from './BoardsList';
import StickyNote from './StickyNote';
import * as Icons from 'react-bootstrap-icons';

function Workspace() {
    const board = {
        'title': 'Untitled Board', 
        'stickyNotes': [
            { color: 'bg-green-200', 'top': 100, 'left': 100, 'width': 100, 'height': 100, front: '病' },
            { color: 'bg-red-200', 'top': 100, 'left': 100, 'width': 100, 'height': 100, front: '病' },
            { color: 'bg-yellow-200', 'top': 100, 'left': 100, 'width': 100, 'height': 100, front: '病' },
            { color: 'bg-blue-200', 'top': 100, 'left': 100, 'width': 100, 'height': 100, front: '病' },

        ]
    }
    return (
        <div className="h-screen bg-purple-300 flex flex-col">
          {/* Container for Tabs and Main Content */}
          <div className="flex flex-grow">
            {/* Sidebar */}
            <div className="w-64 bg-purple-500 p-4 flex-shrink-0">
              <h2 className="text-2xl font-bold text-white mb-4">Your Boards</h2>
              <div className="space-y-2">
                <BoardsList />
              </div>
            </div>
    
            {/* Main Content Area */}
            <div className="flex flex-col flex-grow p-4">
              {/* Top Navigation Tabs */}
              <div className="flex space-x-2 mb-4">
                {[
                  <><Icons.Stickies style={{display: 'inline-block', marginRight: '5px'}}></Icons.Stickies>  New Note</>, 
                  <><Icons.Trash3 style={{display: 'inline-block', marginRight: '5px'}}></Icons.Trash3>  Delete All</>, 
                  <><Icons.Eyeglasses style={{display: 'inline-block', marginRight: '5px'}}></Icons.Eyeglasses>  Flip All</>, 
                  <><Icons.Share style={{display: 'inline-block', marginRight: '5px'}}></Icons.Share>  Share</>, 
                  <><Icons.Save style={{display: 'inline-block', marginRight: '5px'}}></Icons.Save>  Import</>,
                ].map((tab, index) => (
                  <button key={index} className="bg-purple-400 text-white px-3 py-1 rounded-lg hover:bg-purple-500">
                    {tab}
                  </button>
                ))}
              </div>
    
              {/* Main Content */}
              <Board board={board}/>
            </div>
          </div>
        </div>
      );
}

export default Workspace;