import React, {useEffect, useRef, useState} from 'react';

const TableHeader = ({ headlines, setSort, sortLabels, hideColumn, inTotal }) => {
    debugger

    const headerRow = React.createRef();
    const [headerRowHeight, setHeaderRowHeight] = useState(0);

    let sideHeadlines = [];
        
    for(let i = 0; i < 2; i++) {
        sideHeadlines.push( <span>{ headlines[i].title }</span> )
    }  

    const headlineList = headlines.map( (item, index) => {
        if (index > 1) {

            const button = <button onClick={ () => setSort(item.key, item.rule) }>
                                {sortLabels[item.key] ? '↑': '↓'} 
                            </button>

            return <th className="th">
                <button onClick={ () => hideColumn(item.key) }>x</button><br/>
                { item.title }<br/> 
                <nobr>
                сортировать: { button }
                </nobr>
            </th>
        }
    })

    const totalList = inTotal.map( (item, index) => {
        if (index > 1) {
            return (
                <th className="total" style={{top: headerRowHeight+'px'}}>
                { item }
                </th>
            )
        }
    })

    useEffect(()=>{
        setHeaderRowHeight(headerRow.current.offsetHeight);
    }, [headlines])

    return (
        <thead>
            <tr ref={headerRow}>
                <th className="th">
                    <span className="interactiveTable__numbering">№</span>
                    { sideHeadlines }
                </th>
                { headlineList }
            </tr>
            <tr>
                <th className="total" style={{top: headerRowHeight+'px'}}>
                    итого:
                </th>
                { totalList }
            </tr>
        </thead>
    );
}

export default TableHeader