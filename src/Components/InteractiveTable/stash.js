    // const headerRow = useRef(null);
    // let headerRowHeight = 0;

    // useEffect( ()=> {
    //     headerRowHeight = headerRow.current && headerRow.current.offsetHeight;
    // })

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












     