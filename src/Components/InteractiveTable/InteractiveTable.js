import React, { useState, useEffect, Component } from 'react';
import TableFilter from './TableFilter';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import Api from '../../api';
import './InteractiveTable.scss';
import { filterHeadlines, filterBody, calculateData } from './util';


class InteractiveTable extends Component {

    componentDidMount () {
        this.uploadData();
    }

    state = {
        body: [],
        headlines: [],
        requestNumber: 10,
        key: null,
        rule: 'text',
        sortLabels: null,
        filter: [],
        hiddenColumns: [],
        curentHead: null,
    }

    container = React.createRef();

    dragStartHandler = (e, head) => {
      this.setState( () => {
        return {
            curentHead: head
        }
      })
    }
  
    dragEndHandler = (e) => {
      e.target.style.background = '#B0C3FF';
    }
  
    dragOverHandler = (e) => {
      e.preventDefault();
      e.target.style.background = '#ddf3dc';
    }
  
    dropHandler = (e, head) => {
        e.preventDefault();
  
        this.setState((state) => {
            return {
                headlines: state.headlines.map(c => {
                    if (c.key === head.key) {
                        return { ...state.curentHead }
                    }
                    if (c.key === state.curentHead.key) {
                        return { ...head }
                    }
                    return c
                })
            }
        })

        e.target.style.background = '#B0C3FF';
    }



    showColumn = (column) => {
        this.setState((state) => {
            return {
                hiddenColumns: state.hiddenColumns.filter( item => {
                    return (item !== column)
                })
            }
        })
    }

    hideColumn = (column) => {
        this.setState((state) => {
            return {
                hiddenColumns: [...state.hiddenColumns, column]
            }
        })
    }

    setSort = (key, rule) => {
        this.setState((state) => {
            return {key, rule, sortLabels: {...state.sortLabels, [key]: !state.sortLabels[key]}};
        });
    }

    setFilter = (value) => {
        this.setState((state) => {
            return {filter: [...state.filter, value]};
        });
    }

    removeFilter = (value) => {
        this.setState((state) => {
            return {filter: state.filter.filter( item => {
                return (item !== value)
            })};
        });
    }

    checkScrollTop = () => {
        let elem = this.container.current;
        let result = elem.scrollHeight - (elem.scrollTop + elem.clientHeight)

        // if(result === 0) {
             // this.uploadData();
        // }   

        setTimeout(() => {
            if(result === 0) {
                this.uploadData();
            }   
        }, 1000);
    }

    uploadData = () => {
        if(this.state.requestNumber < 20) {
            if(this.state.headlines.length === 0) {
                this.setState( () => {
    
                    const newObj = {};
                    const headlines = Api.getHeadlines();
    
                    headlines.forEach( item => {
                        newObj[item.key] = true;
                    })
                
                    return { headlines: headlines,
                        sortLabels: {...newObj}
                    }
                })
            }
    
            this.setState( (state)=>{
                return { body: [...state.body, ...Api.getPortionData(14)],
                    requestNumber: state.requestNumber + 1
                    // portionNumber: state.portionNumber + 1
                }
            })

        }
    }

    render () {
        if(this.state.body.length > 0 && this.state.body.length > 0) {
            const filterRef = React.createRef();

            const filteredHeadlines = filterHeadlines(this.state.headlines, this.state.hiddenColumns)
            const filteredBody = filterBody(this.state.body, this.state.filter, this.state.key, this.state.rule, this.state.sortLabels)
            const inTotal = calculateData(filteredBody, filteredHeadlines)

            return  (
                <div className='interactiveTable' onScroll={this.checkScrollTop} ref={this.container}>
                    <TableFilter setFilter={this.setFilter} 
                                removeFilter={this.removeFilter} 
                                hiddenColumns={this.state.hiddenColumns}
                                showColumn={this.showColumn}
                                itemRef = {filterRef}
                            />
                    <table>
                        <TableHeader headlines={filteredHeadlines} 
                                    setSort={this.setSort} 
                                    sortLabels={this.state.sortLabels}
                                    hideColumn={this.hideColumn}
                                    hiddenColumns={this.state.hiddenColumns}
                                    inTotal={inTotal}
                                    itemRef={filterRef}
                                    dragStartHandler = {this.dragStartHandler}
                                    dragEndHandler = {this.dragEndHandler}
                                    dragOverHandler = {this.dragOverHandler}
                                    dropHandler = {this.dropHandler}
                                />
                        <TableBody body={filteredBody} headlines={filteredHeadlines} />
                    </table>
                </div>
            )
        } return null
    }
}

export default InteractiveTable;