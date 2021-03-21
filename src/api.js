import response from './data.json';

const API = {
    getHeadlines: () => response.headlines ,
    
    getPortionData: (pageSize, pageNumber) => {
        const startIndex = (pageNumber * pageSize) - 1;
        const endIndex = startIndex + pageSize;
    
        const portionData = response.body.map((item, index) => {
            if (index > startIndex && index <= endIndex) {
                return item;
            }
        })
    
        return portionData;
    }
}

export default API