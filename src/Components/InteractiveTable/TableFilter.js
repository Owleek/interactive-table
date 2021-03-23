import React, { useEffect, useState } from "react";

const TableFilter = ({ setFilter, removeFilter, ...props }) => {
    
    let fruitsPrefix = 'f',
        fruitValues = [],
        fruits = ['Фрукты', 'Ягоды'];

    let deliveryPrefix = 'd',
        deliveryValues = [],
        delivery = ['Мелкие поставки', 'Крупные поставки'];
    
    const [fruitBusy, setFruitState] = useState([]);
    const [deliveryBusy, setDeliveryState] = useState([]);

    useEffect(()=>{
        setFruitState(fruitValues);
        setDeliveryState(deliveryValues);
    }, [setFilter])
    
    const handleCheckbox = (event) => {
        let elem = event.target.value,
            checked = event.target.checked,
            selectType = elem[0];

        if(selectType === fruitsPrefix) {
            if(checked) {
                setFruitState([elem]);
                setFilter(elem);
            } else {
                setFruitState(fruitValues);
                removeFilter(elem);
            }
        }

        if(selectType === deliveryPrefix) {
            if(checked) {
                setDeliveryState([elem])
                setFilter(elem);
            } else {
                setDeliveryState(deliveryValues);
                removeFilter(elem);
            }
        }
    }

    const checkFruitBusy = (value) => {
        return !fruitBusy.includes(value)
    }

    const checkDeliveryBusy = (value) => {
        return !deliveryBusy.includes(value)
    }

    const createFields = (data, productPrefix, array, disabledFunc) => {
        return data.map( (item, index) => {
            let value = productPrefix+index;
            array.push(value);
    
            return (
                    <li>
                        <label>
                            <input type="checkbox" disabled={disabledFunc(value)} value={value} onChange={handleCheckbox}/>
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