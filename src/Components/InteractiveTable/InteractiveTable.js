import React, { useState, useEffect } from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import Api from '../../api';
import './InteractiveTable.scss';

const InteractiveTable = () => {
    
    const [headlines, setHeadlines] = useState(null);
    const [body, setBody] = useState(null);
    const [portionNumber, setPortionNumber] = useState(0);

    const uploadData = () => {
        (!headlines) && setHeadlines(Api.getHeadlines());        
        setBody(Api.getPortionData(4, portionNumber))
        setPortionNumber(portionNumber + 1);
    }

    useEffect(()=>{
        uploadData();
    })

    return (
        <div className='interactiveTable'>
            <table>
                <TableHeader />
                <TableBody />
            </table>
        </div>
    )
}

export default InteractiveTable;