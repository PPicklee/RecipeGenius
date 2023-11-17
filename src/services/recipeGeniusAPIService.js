const axios = require('axios');

const apiUrl = 'https://prod-101.westus.logic.azure.com:443/workflows/4be074d72cb4412c94f622bd0d8ca302/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=tJPeTl7qDvhrhSLKeszzK37Vt9Vs7wHmZx5VwyJhGVQ';

const invokeApi = async (filterName, filterValue) => {
  try {
    const requestBody = {
      filterName: filterName,
      filterValue: filterValue
    };

    const headers = {
      'content-type': 'application/json'
    };

    const response = await axios.post(apiUrl, requestBody, { headers });

    // // Handle the response as needed
    // console.log('API Response:', response.data);

    return response.data;
  } catch (error) {
    // Handle errors
    console.error('API Error:', error.message);
    throw error;
  }
};

module.exports = {
  invokeApi
};
