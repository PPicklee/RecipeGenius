import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Recipe() {
    const { name } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const apiUrl = 'https://prod-101.westus.logic.azure.com:443/workflows/4be074d72cb4412c94f622bd0d8ca302/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=tJPeTl7qDvhrhSLKeszzK37Vt9Vs7wHmZx5VwyJhGVQ';
        const requestBody = {
            filterName: 'recipeName',
            filterValue: decodeURIComponent(name) // Decode the URL-friendly recipe name
        };
        const headers = {
            'content-type': 'application/json'
        };

        axios.post(apiUrl, requestBody, { headers })
            .then(response => {
                console.log("DATA: ", response.data);
                if (response.data.recipes.length > 0) {
                    setRecipe(response.data.recipes[0]);
                }
            })
            .catch(error => console.error('Error:', error));
    }, [name]);

    if (!recipe) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {Object.entries(recipe).filter((_, index) => index !== 0).map(([key, value]) => (
                <div key={key}>
                    <h3>{camelCaseToRegularCase(key)}:</h3>
                    {Array.isArray(value) ? (
                        value.map((item, index) => <p key={index}>{item}</p>)
                    ) : (
                        <p>{value}</p>
                    )}
                </div>
            ))}
        </div>
    );
}

function camelCaseToRegularCase(str) {
    return str
        .replace(/([A-Z])/g, ' $1') // add a space before each capital letter
        .toLowerCase() // convert the entire string to lowercase
        .replace(/(^\w|\s\w)/g, m => m.toUpperCase()) // capitalize the first letter of each word
        .trim(); // remove leading and trailing spaces
}

export default Recipe;