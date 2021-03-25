import React from 'react';

const TableBody = ({ body, headlines }) => {    
    let iterationsCount = 0;

    const rowList = body.map( item => {
        iterationsCount++
        const sideCells = [];
        const cells = [];

        headlines.forEach( (headline, index) => {
            if(index <= 1) {
                item[headline.key] 
                ? sideCells.push( <span>{ item[headline.key] }</span> )
                : sideCells.push( <span>{ null }</span> )
            }
        
            if(index > 1) {
                item[headline.key] 
                ? cells.push( <td>{ item[headline.key] }</td> )
                : cells.push( <td>{ null }</td> )
            }
        })

        return (
            <tr>
                <th>
                    <span className="interactiveTable__numbering">{ iterationsCount }</span>
                    { sideCells }
                </th>
                { cells }
            </tr>
        )
    })

    return (
        <tbody>
            { rowList }
        </tbody>
    )
}

export default TableBody