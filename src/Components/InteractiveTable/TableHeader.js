import React, {useEffect, useRef, useState} from 'react';

const TableHeader = ({ 
    headlines,
    setSort, 
    sortLabels, 
    hideColumn, 
    inTotal, 
    itemRef,
    dragStartHandler,
    dragEndHandler,
    dragOverHandler,
    dropHandler
}) => {

    const headerRow = React.createRef();
    const [filterHeight, setFilterHeight] = useState(0);
    const [headerRowHeight, setHeaderRowHeight] = useState(0);

    let sideHeadlines = [];
        
    for(let i = 0; i < 2; i++) {
        sideHeadlines.push( <span>{ headlines[i].title }</span> )
    }  

    const headlineList = headlines.map( (item, index) => {
        if (index > 1) {

            const button = <small onClick={ () => setSort(item.key, item.rule) } title="Сортировать" className="interactiveTable__tool">
                                { sortLabels[item.key]
                                    ? <i class="demo-icon icon-sort-alt-up"></i>
                                    : <i class="demo-icon icon-sort-alt-down"></i>
                                } 
                            </small>

            return <th   
                        onDragStart={(e) => dragStartHandler(e, item)}
                        onDragLeave={(e) => dragEndHandler(e)}
                        onDragEnd={(e) => dragEndHandler(e)}
                        onDragOver={(e) => dragOverHandler(e)}
                        onDrop={(e) => dropHandler(e, item)}
                        draggable className="th" style={{top: filterHeight+'px'}} 
                        title="Поменять местами колонки">
                    
                    
                    <div className="interactiveTable__tools">
                        { button }
                        <small onClick={ () => hideColumn(item.key) } title="Скрыть колонку" className="interactiveTable__tool">
                            <i class="icon-eye-off"></i>
                        </small>
                    </div>
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