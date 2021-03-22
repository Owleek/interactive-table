import React from 'react';

const TableHeader = ({ headlines }) => {
    let headlineList = [];
    let sideHeadlines = [];

    if(headlines) {
        
        for(let i = 0; i < 2; i++) {
            sideHeadlines.push( <span>{ headlines[i].title }</span> )
        }

        headlineList = headlines && headlines.map( (item, index) => {
            if (index > 1) {
                return <th>{ item.title }</th>
            }
        })
    }

    return (
        <thead>
            <tr>
                <th>
                    <span className="interactiveTable__numbering">№</span>
                    { sideHeadlines }
                </th>
                { headlineList }
            </tr>
        </thead>
    );
}

export default TableHeader