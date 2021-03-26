import response from './data.json';

const headlines = [
    {
      "title": "Наименование",
      "key": "title",
      "rule": "text",
      "value": "0",
    },
    {
      "title": "Код товара",
      "key": "id",
      "rule": "number",
      "value": "0"
    },
    {
      "title": "Вес",
      "key": "weight",
      "rule": "number",
      "value": "1"
    },
    {
      "title": "Количество боксов",
      "key": "box",
      "rule": "number",
      "value": "1"
    },
    {
      "title": "План",
      "key": "plan",
      "rule": "number",
      "value": "2"
    },
    {
      "title": "Затраты",
      "key": "cost",
      "rule": "number",
      "value": "1"
    },
    {
      "title": "Доставлено",
      "key": "availability",
      "rule": "text",
      "value": "3"
    },
    {
      "title": "Число",
      "key": "decimal",
      "rule": "number",
      "value": "2"
    }
];
  
// Массив рэндомных названий
const names = [
    'Яблоко', 'Груша', 'Абрикос', 'Апельсин', 'Авакадо', 'Cлива', 'Хурма', 'Банан',
    'Нектарин', 'Киви', 'Лимон', 'Алыча', 'Ананас', 'Аннона', 'Бергамот', 'Грейпфрут',
    'Гуава', 'Джекфрут', 'Питахайя', 'Дуриан', 'Карамбола', 'Клементины', 'Кумкват', 'Лайм',
    'Лимон', 'Манго', 'Персик', 'Мандарин', 'Маракуйя', 'Папайя', 'Помело', 'Рамбутан',
    'Салак', 'Саподилла', 'Свити', 'Танжело', 'Хеномелес', 'Цитрон', 'Черимойя', 'Чомпу',
    'Клубника', 'Земляника',  'Черника', 'Ежевика',   'Смородина', 'Облепиха',  'Брусника', 'Голубика', 
    'Клюква', 'Шиповник', 'Шелковица', 'Черемуха', 'Черешня', 'Физалис', 'Фейхоа', 'Терн',
    'Рябина', 'Оливки', 'Морошка', 'Лимонник', 'Калина', 'Калина', 'Виноград', 'Бузина',
    'Барбарис', 'Арбуз', 'Малина', 'Дыня', 'Крыжовник', 'Ирга', 'Черноплодная рябина', 'Черная смородина',
    'Красная смородина', 'Кизил', 'Годжи ягоды', 'Инжир'
];
  




const getArrayRandomValue = (array = []) => array[Math.floor(Math.random() * array.length)];
const generateNumber = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));
  
// Ключи соответствуют свойству key массива headlines 
const generatorTypes = {
    title: () => getArrayRandomValue(names),
    id: () => Math.floor(Math.random() * 100000).toString(),
    weight: () => `${generateNumber(5, 300)}кг.`,
    box: () => `${generateNumber(1, 100)}шт.`,
    plan: () => `${generateNumber(0, 100)}%`,
    cost: () => `${generateNumber(1000, 20000)}руб.`,
    availability: () => getArrayRandomValue(["Да", "Нет"]),
    decimal: () => generateNumber(10, 200),
};
  
const rowDataGenarator = (headlines, generatorTypes) => {
    const rowData = {};

    // Проходим по каждому полю headlines и забираем у него значение свойства key смотрим в объект generatorTypes
    // Берем эту фукнцию и запускаем, она должна вернуть нужный нам результат
    headlines.forEach((item) => {
        const valueGenerator = generatorTypes[item.key];
        rowData[item.key] = valueGenerator ? valueGenerator() : "";
    });

    return rowData;
}
  
  // Небольшая функция, которая сгенерирует нам столько элементов массива сколько нужно, count штук. По умолчанию 1
const generateDataByCount = (count = 1) => {
    const tempData = [];

    for (let i = 0; i < count; i++) {
        const randomRowDataObject = rowDataGenarator(headlines, generatorTypes);
        tempData.push(randomRowDataObject);
    }

    return tempData;
}


const API = {
    getHeadlines: () => response.headlines ,
    getPortionData: (pageSize) => {
        return generateDataByCount(pageSize);
    }
    // getPortionData: (pageSize, pageNumber) => {
    //     const startIndex = (pageNumber * pageSize) - 1;
    //     const endIndex = startIndex + pageSize;
    //     const portionData = [];

    //     for(let i = 0; i < response.body.length; i++) {
    //         if (i > startIndex && i <= endIndex) {
    //             portionData.push(response.body[i]);
    //         }
    //     }
    
    //     return portionData;
    // }
}

export default API