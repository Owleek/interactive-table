import React, { useState, useEffect, Component } from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import Api from '../../api';
import './InteractiveTable.scss';


class InteractiveTable extends Component {

    state = {
        headlines: null,
        body: [],
        portionNumber: 0
    }

    container = React.createRef();

    componentDidMount () {
        this.uploadData();
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
            this.setState( ()=>{
                return { headlines: Api.getHeadlines()}
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
                <table>
                    <TableHeader headlines={this.state.headlines}/>
                    <TableBody body={this.state.body} headlines={this.state.headlines}/>
                </table>
            </div>
        )
    }
}
// const InteractiveTable = () => {
    
//     const [headlines, setHeadlines] = useState(null);
//     const [body, setBody] = useState(null);
//     const [portionNumber, setPortionNumber] = useState(0);

//     const uploadData = () => {
//         (!headlines) && setHeadlines(Api.getHeadlines());        
//         setBody(Api.getPortionData(4, portionNumber))
//         setPortionNumber(portionNumber + 1);
//     }


//     useEffect(()=>{
//         uploadData();
//     }, [headlines])

//     return (
//         <div className='interactiveTable'>
//             <table>
//                 <TableHeader headlines={headlines}/>
//                 <TableBody body={body} headlines={headlines}/>
//             </table>
//         </div>
//     )
// }

export default InteractiveTable;