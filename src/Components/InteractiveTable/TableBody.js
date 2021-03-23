import React from 'react';

const TableBody = ({ body, headlines, colName, rule, sortLabels }) => {
    let rowList = null;
    
    if (body && headlines) {
        let iterationsCount = 0;
        let arr = body;


        if(colName) {
            const copy = [...body];

            if(rule === 'number') {

                if(sortLabels[colName]) {
                    copy.sort( (rowA, rowB) => {
                        return parseFloat(rowA[colName]) - parseFloat(rowB[colName])
                    })
                } else {
                    copy.sort( (rowA, rowB) => {
                        return parseFloat(rowB[colName]) - parseFloat(rowA[colName])
                    })
                }


            } else {

                if(sortLabels[colName]) {
                    copy.sort( (rowA, rowB) => {
                        return rowA[colName] > rowB[colName] ? 1 : -1
                    })
                } else {
                    copy.sort( (rowA, rowB) => {
                        return rowA[colName] < rowB[colName] ? 1 : -1
                    })
                }
            }


            arr = copy;
        }



        rowList = arr.map( item => {
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
    }

    return (
        <tbody>
            { rowList }
        </tbody>
    )
}

export default TableBody