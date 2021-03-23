import React, { useState, useEffect, Component } from 'react';
import TableFilter from './TableFilter';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import Api from '../../api';
import { fruitVocabulary, berryVocabulary } from '../../vocabulary';
import './InteractiveTable.scss';


class InteractiveTable extends Component {

    componentDidMount () {
        this.uploadData();
    }

    state = {
        headlines: null,
        body: [],
        portionNumber: 0,
        key: null,
        rule: 'text',
        sortLabels: null,
        filter: [],
    }

    container = React.createRef();

    sortASC = (key, rule) => {
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
        if(result === 0) {
            this.uploadData();
        }
    }

    uploadData = () => {
        if(!this.state.headlines) {
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
            return { body: [...state.body, ...Api.getPortionData(4, state.portionNumber)],
                portionNumber: state.portionNumber + 1
            }
        })
    }

    render () {
        return (
            <div className='interactiveTable' onScroll={this.checkScrollTop} ref={this.container}>
                <TableFilter setFilter={this.setFilter} removeFilter={this.removeFilter} />
                <table>
                    <TableHeader headlines={this.state.headlines} 
                                 sortASC={this.sortASC} 
                                 sortLabels={this.state.sortLabels}
                            />
                    <TableBody body={this.state.body} 
                               headlines={this.state.headlines} 
                               colName={this.state.key}
                               rule={this.state.rule}
                               sortLabels={this.state.sortLabels}
                               filter={this.state.filter}
                               fruitVocabulary={fruitVocabulary}
                               berryVocabulary={berryVocabulary}
                            />
                </table>
            </div>
        )
    }
}

export default InteractiveTable;