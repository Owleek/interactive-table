import { fruitVocabulary, berryVocabulary } from '../../vocabulary';


export const filterHeadlines = (headlines, hiddenItems) => {    
    if(hiddenItems.length > 0) {
        for(let i = 0; i < hiddenItems.length; i++){

            let elem = hiddenItems[i];

            headlines = headlines.filter( item => {
                return !(item.key === elem)
            })
        }

        return headlines
    } else {
        return headlines
    }
}


export const filterBody = ( body, filter, colName, rule, sortLabels) => {

    let copiedBody = [...body];
    
    if(filter.length > 0) {
        for(let i = 0; i < filter.length; i++){

            let elem = filter[i];
            switch(elem) {
                case 'd0': 
                    copiedBody = copiedBody.filter( item => {
                        return (parseFloat(item.weight) <= 50)
                    });
                    break;
                case 'd1':
                    copiedBody = copiedBody.filter( item => {
                        return (parseFloat(item.weight) > 50)
                    });
                    break;
                case 'f0':
                    copiedBody = copiedBody.filter( item => {
                        return fruitVocabulary.includes(item.title)
                    });
                    break;
                case 'f1':
                    copiedBody = copiedBody.filter( item => {
                        return berryVocabulary.includes(item.title)
                    });
                    break;
                default: 
                    break;
            }
            
        }

    } 

    if(colName) {

        if(rule === 'number') {

            if(sortLabels[colName]) {
                copiedBody.sort( (rowA, rowB) => {
                    return parseFloat(rowA[colName]) - parseFloat(rowB[colName])
                })
            } else {
                copiedBody.sort( (rowA, rowB) => {
                    return parseFloat(rowB[colName]) - parseFloat(rowA[colName])
                })
            }

        } else {

            if(sortLabels[colName]) {
                copiedBody.sort( (rowA, rowB) => {
                    return rowA[colName] > rowB[colName] ? 1 : -1
                })
            } else {
                copiedBody.sort( (rowA, rowB) => {
                    return rowA[colName] < rowB[colName] ? 1 : -1
                })
            }
        }
    }
    
    return copiedBody
}


export const calculateData = (filteredBody, filteredHeadlines) => {
    let inTotal = [];

    filteredHeadlines.forEach( item => {
        let value = '';
        let data = 0;

        switch(item.key) {
            case 'weight':
                value = ' кг'
                break
            case 'plan':
                value = ' %'
                break
            case 'box':
                value = ' шт'
                break
            case 'cost':
                value = ' руб'
                break
            default: 
                break
        }

        switch(item.value) {
            case "0":
                inTotal.push('');
                break
            case "1":
                inTotal.push(sumFunction(filteredBody, item.key) + value);
                break
            case "2":
                data = avgFunction(filteredBody, item.key)
                inTotal.push('средн. ~' + data + value);
                debugger
                break
        }
    })

    return inTotal;
}


const sumFunction = (array, item) => {
    let sum = 0;
    
    array.forEach( row => {
        sum += parseFloat(row[item])
    })

    return sum.toFixed(0);
}


const avgFunction = (array, item) => {
    let sum = 0;

    if(array.length === 0) {
        return 0;
    } else {
        array.forEach( row => {
            sum += parseFloat(row[item])
        })

        return (sum / array.length).toFixed(0);
    }

}