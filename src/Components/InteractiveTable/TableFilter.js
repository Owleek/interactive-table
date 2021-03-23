import React, { useEffect, useState } from "react";

const TableFilter = ({ setFilter, removeFilter, ...props }) => {
    
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

    return (
        <div>
            <h4>Фильтр:</h4>
            <ul>
                { createFields(fruits, fruitsPrefix, fruitValues, checkFruitBusy) }
                { createFields(delivery, deliveryPrefix, deliveryValues, checkDeliveryBusy) }
            </ul>
        </div>
    )
}

export default TableFilter;