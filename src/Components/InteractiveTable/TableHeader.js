import React, {useEffect, useRef, useState} from 'react';

const TableHeader = ({ headlines, setSort, sortLabels, hideColumn, inTotal, itemRef }) => {

    const headerRow = React.createRef();
    const [filterHeight, setFilterHeight] = useState(0);
    const [headerRowHeight, setHeaderRowHeight] = useState(0);

    let sideHeadlines = [];
        
    for(let i = 0; i < 2; i++) {
        sideHeadlines.push( <span>{ headlines[i].title }</span> )
    }  

    const headlineList = headlines.map( (item, index) => {
        if (index > 1) {

            const button = <button onClick={ () => setSort(item.key, item.rule) } title="сортировать">
                                {sortLabels[item.key] ? '↑': '↓'} 
                            </button>

            return <th className="th" style={{top: filterHeight+'px'}}>
                <nobr style={{display: "inline-block", verticalAlign: "middle"}}>
                    { button }
                    <button onClick={ () => hideColumn(item.key) } title="Скрыть колонку">x</button><br/>
                </nobr><br/>
                { item.title } 
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
        setFilterHeight(itemRef.current.offsetHeight);
        setHeaderRowHeight(headerRow.current.offsetHeight + filterHeight);
    })

    return (
        <thead>
            <tr ref={headerRow}>
                <th className="th" style={{top: filterHeight+'px'}}>
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