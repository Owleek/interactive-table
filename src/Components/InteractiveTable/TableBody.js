import React from 'react';

const TableBody = ({ body, headlines, colName, rule, sortLabels, filter, berryVocabulary, fruitVocabulary, hiddenColumns }) => {    
    let rowList = null;
    
    let filteredData = [...body];
    let filteredHeadlines = [...headlines];


    if (body && headlines.length > 0) {
        let iterationsCount = 0;

        if(hiddenColumns.length > 0) {
            for(let i = 0; i < hiddenColumns.length; i++){
    
                let elem = hiddenColumns[i];
    
                filteredHeadlines = filteredHeadlines.filter( item => {
                    return !(item.key === elem)
                })
            }
    
        } else {
            filteredHeadlines = [...headlines];
        }
        

        if(filter.length > 0) {
            for(let i = 0; i < filter.length; i++){

                let elem = filter[i];
                switch(elem) {
                    case 'd0': 
                        filteredData = filteredData.filter( item => {
                            return (parseFloat(item.weight) <= 40)
                        });
                        break;
                    case 'd1':
                        filteredData = filteredData.filter( item => {
                            return (parseFloat(item.weight) > 40)
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

            filteredHeadlines.forEach( (headline, index) => {
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