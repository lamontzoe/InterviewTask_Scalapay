const axios = require('axios');
const { parse } = require('json2csv');
const fs = require('fs');


// Define Initial Function
const fetchData = async () => {
    // Define API endpoint GET request
    const config = {
    method: 'get',
    url: 'https://integration.api.scalapay.com/v3/configurations',
    headers: {
        'Authorization': 'Bearer qhtfs87hjnc12kkos'
    }
    };

    // Run Axios GET request using defined API endpoint
    const scalapayData = axios(config)
    .then((response) => {
        // Save GET response data as a variable
        const res = response.data;
        // Run formatCSV function to convert response into CSV
        const csvFile = formatCSV(res);
        // Write API response to stdout as a CSV
        process.stdout.write(csvFile);
        
    });
};


// Define formatCSV function
function formatCSV (scalapayData) {
    // Set header line
    const header = ["product, type, minAmount, maxAmount"];
    // Define row data and formating
    const rows = scalapayData.map(scalapayData =>
       `${scalapayData.product}, ${scalapayData.type}, ${scalapayData.configuration.minimumAmount.amount}, ${scalapayData.configuration.maximumAmount.amount}`
    );
    // Output CSV
    return header.concat(rows).join("\n");
}

// Call fetch data function
fetchData();
