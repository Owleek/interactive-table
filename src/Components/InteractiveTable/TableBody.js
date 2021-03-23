import React from 'react';

const TableBody = ({ body, headlines, colName, rule, sortLabels, filter }) => {
    debugger
    
    let rowList = null;

    if (body && headlines) {
        let iterationsCount = 0;

        let filteredData = [];

        if(filter.length > 0) {

            let elem = filter[0];
    
            if(elem === 'd1') {
    
                filteredData = body.filter( item => {
                    return (parseFloat(item.box) > 40)
                })
                debugger
                
            }
        } else {
            filteredData = [...body];
        }
    

        if(colName) {

            if(rule === 'number') {

                if(sortLabels[colName]) {
                    filteredData.sort( (rowA, rowB) => {
                        return parseFloat(rowA[colName]) - parseFloat(rowB[colName])
                    })
                } else {
                    filteredData.sort( (rowA, rowB) => {
                        return parseFloat(rowB[colName]) - parseFloat(rowA[colName])
                    })
                }


            } else {

                if(sortLabels[colName]) {
                    filteredData.sort( (rowA, rowB) => {
                        return rowA[colName] > rowB[colName] ? 1 : -1
                    })
                } else {
                    filteredData.sort( (rowA, rowB) => {
                        return rowA[colName] < rowB[colName] ? 1 : -1
                    })
                }
            }
        }


        rowList = filteredData.map( item => {
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