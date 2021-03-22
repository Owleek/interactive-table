import response from './data.json';

const API = {
    getHeadlines: () => response.headlines ,
    
    getPortionData: (pageSize, pageNumber) => {
        const startIndex = (pageNumber * pageSize) - 1;
        const endIndex = startIndex + pageSize;
        const portionData = [];

        for(let i = 0; i < response.body.length; i++) {
            if (i > startIndex && i <= endIndex) {
                portionData.push(response.body[i]);
            }
        }
    
        return portionData;
    }
}

export default API