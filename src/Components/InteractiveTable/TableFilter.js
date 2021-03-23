import React, { useEffect, useState } from "react";

const TableFilter = (props) => {
    let fruitsPrefix = 'f';
    let fruitValues = [];
    let fruits = ['Фрукты', 'Ягоды'];

    let deliveryPrefix = 'd';
    let deliveryValues = [];
    let delivery = ['Мелкие поставки', 'Крупные поставки'];
    
    const [fruitBusy, setFruitState] = useState([]);
    const [deliveryBusy, setDeliveryState] = useState([]);

    useEffect(()=>{
        setFruitState(fruitValues);
        setDeliveryState(deliveryValues);
    }, [props])
    
    const handleCheckbox = (event) => {
        let elem = event.target.value;
        let checked = event.target.checked;
        let selectType = elem[0];

        if(selectType === fruitsPrefix) {
            checked ? setFruitState([elem]): setFruitState(fruitValues);
        }

        if(selectType === deliveryPrefix) {
            checked ? setDeliveryState([elem]): setDeliveryState(deliveryValues);
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