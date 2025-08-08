**Interactive-table** — черновой прототип таблицы с фиксированной строкой сверху и фиксированным столбцом слева.


- 📁 Пока не оформлено как полноценный компонент — просто сохранённый кусок кода с логикой и стилями  


- 🔧 Возможна доработка и превращение в переиспользуемый компонент при возникновении необходимости

## 🛠 Используемые технологии

- HTML / CSS (SCSS)
- JavaScript
- React

```bash
# Установите зависимости
npm install
```

```bash
npm start
```

## 📁 Структура

```
interactive-table/
├── public/                 
├── src/
│   ├── Components/
│   │   └── InteractiveTable/  # Основной компонент таблицы
│   │       ├── InteractiveTable.js
│   │       ├── InteractiveTable.scss
│   │       ├── TableBody.js
│   │       ├── TableFilter.js
│   │       ├── TableHeader.js
│   │       ├── Tag.js
│   │       └── util.js
│   ├── App.js             # Главный компонент приложения
│   ├── api.js             # API для получения данных
│   └── data.json          # Тестовые данные
├── package.json           # Зависимости и скрипты
└── README.md             # Документация
