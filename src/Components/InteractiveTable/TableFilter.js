import React, { useEffect, useState } from "react";
import Tag from './Tag';

const TableFilter = ({ setFilter, removeFilter, hiddenColumns, showColumn, itemRef }) => {
    
    let fruitsPrefix = 'f',
        fruitValues = [],
        fruits = ['Фрукты', 'Ягоды'];
 
    let deliveryPrefix = 'd',
        deliveryValues = [],
        delivery = ['Мелкие поставки', 'Крупные поставки'];
    

    const [fruitBusy, setFruitState] = useState('');
    const [deliveryBusy, setDeliveryState] = useState('');
    

    const handleCheckbox = (event) => {
        let elem = event.target.value,
            checked = event.target.checked,
            selectType = elem[0];

        if(selectType === fruitsPrefix) {
            if(checked) {
                if(elem !== fruitBusy) {
                    removeFilter(fruitBusy);
                }

                setFruitState(elem);
                setFilter(elem);
            } else {
                setFruitState('');
                removeFilter(elem);
            }
        }

        if(selectType === deliveryPrefix) {
            if(checked) {
                if(elem !== deliveryBusy) {
                    removeFilter(deliveryBusy);
                }

                setDeliveryState(elem)
                setFilter(elem);
            } else {
                setDeliveryState('');
                removeFilter(elem);
            }
        }
    }

    const checkFruitBusy = (value) => {
        return (fruitBusy === value)
    }

    const checkDeliveryBusy = (value) => {
        return (deliveryBusy === value)
    }

    const createFields = (data, productPrefix, array, checkFunc) => {
        return data.map( (item, index) => {
            let value = productPrefix+index;
            array.push(value);
    
            return (
                    <li>
                        <label>
                            <input type="checkbox" checked={checkFunc(value)} value={value} onChange={handleCheckbox}/>
                            {item} 
                        </label>
                    </li>
            )
        }) 
    }

    let hiddenBlock = null;

    if(hiddenColumns.length > 0) {



        hiddenBlock = <div className="interactiveTable__tagsContainer">
                        Скрытые колонки:
                        <div className="interactiveTable__tags">
                            {
                                hiddenColumns.map( item => {
                                    let value = '';

                                    switch(item) {
                                        case 'weight':
                                            value = 'Вес'
                                            break
                                        case 'box':
                                            value = 'Боксы'
                                            break
                                        case 'availability':
                                            value = 'Доставлено'
                                            break
                                        case 'plan':
                                            value = 'План'
                                            break
                                        case 'cost':
                                            value = 'Стоимость'
                                            break
                                        case 'decimal':
                                            value = 'Число'
                                            break
                                    }

                                    return <Tag content={value} callback={ () => showColumn(item) }/>
                                })
                            }
                        </div>
                    </div>
    }

    return (
        <div className="interactiveTable__filterContainer" ref={itemRef}>
            <h4>Фильтр:</h4>
            <ul>
                { createFields(fruits, fruitsPrefix, fruitValues, checkFruitBusy) }
                { createFields(delivery, deliveryPrefix, deliveryValues, checkDeliveryBusy) }
            </ul>
            { hiddenBlock }
        </div>
    )
}

export default TableFilter;