import React from 'react';

const TableHeader = ({ headlines, setSort, sortLabels, hideColumn, inTotal }) => {
    debugger

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
                <th className="total">
                { item }
                </th>
            )
        }
    })

    return (
        <thead>
            <tr>
                <th className="th">
                    <span className="interactiveTable__numbering">№</span>
                    { sideHeadlines }
                </th>
                { headlineList }
            </tr>
            <tr>
                <th className="total">
                    итого:
                </th>
                { totalList }
            </tr>
        </thead>
    );
}

export default TableHeader