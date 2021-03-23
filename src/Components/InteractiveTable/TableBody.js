import React from 'react';

const TableBody = ({ body, headlines, colName, rule, sortLabels, filter, berryVocabulary, fruitVocabulary }) => {    
    let rowList = null;

    if (body && headlines) {
        let iterationsCount = 0;

        let filteredData = [...body];

        if(filter.length > 0) {
            for(let i = 0; i < filter.length; i++){

                let elem = filter[i];
                switch(elem) {
                    case 'd0': 
                        filteredData = filteredData.filter( item => {
                            return (parseFloat(item.box) <= 50)
                        });
                        break;
                    case 'd1':
                        filteredData = filteredData.filter( item => {
                            return (parseFloat(item.box) > 50)
                        });
                        break;
                    case 'f0':
                        filteredData = filteredData.filter( item => {
                            return fruitVocabulary.includes(item.title)
                        });
                        break;
                    case 'f1':
                        filteredData = filteredData.filter( item => {
                            return berryVocabulary.includes(item.title)
                        });
                        break;
                    default: 
                        break;
                }
                
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