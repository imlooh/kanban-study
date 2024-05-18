import React, { useState, useEffect } from 'react';

/**
 * @attributes main={'href': value, 'text': JSX}
 * @attributes data=[{'href': value, 'text': JSX}]
 * 
 */
function RelativeGroup(props) {

    const getDropDown = props.data.map((d) => {
        return (
            <a href={d?.href} className="block px-4 py-2 text-black hover:bg-gray-100">{d?.text}</a>
        )
    });

    return (
        <div className="relative group">
            <a href={props.main?.href} className="hover:text-gray-700">{props.main?.text}</a>
            <div className="absolute left-0 mt-1 w-40 bg-white border border-gray-300 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {getDropDown}
            </div>
        </div>
    )
}

export default RelativeGroup;