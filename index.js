const express = require('express');
const app = express();
const Recipe = require('./src/models/Recipe');
const port = 3000; // Port number

// Define some routes
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Example code to reference during development
/* Example of how to query the API. The API is queried within the search method of the Recipe model class.
   You pass in two arrays: filterNames and filterValues. The value at each index position in each array
   corresponds with each other. For example, in this example, dietaryRestrictionsSatisfied corresponds with vegan|halal|dairy-free.
   You are returned an array of Recipe objects. */
(async () => {
  try {
    // Replace 'ingredient' and 'cuisine' with your actual filter names
    const filterNames = ['dietaryRestrictionsSatisfied', 'ingredients'];
    const filterValues = ['vegan|halal|dairy-free', 'salt|pepper'];

    const result = await Recipe.search(filterNames, filterValues);
    console.log('Search Result:', result);

    // Add more assertions based on your expected behavior
  } catch (error) {
    console.error('Test Error:', error.message);
  }
})();

// Start the server
app.listen(port, () =>{
  console.log(`RecipeGenius listening on port ${port}! http://localhost:3000/`);
});
 
