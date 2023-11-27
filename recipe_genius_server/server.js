//=============IMPORTS=============
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth');
const { fileURLToPath } = require('url');
const { dirname } = require('path');

const Recipe = require('./models/Recipe');

//=============VARIABLES=============
const app = express();
const port = 3001;
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDNynaz1ARcuIHw7RcMsnPSMiAs_D04BL4",
    authDomain: "recipegenius-5525a.firebaseapp.com",
    projectId: "recipegenius-5525a",
    storageBucket: "recipegenius-5525a.appspot.com",
    messagingSenderId: "573829934544",
    appId: "1:573829934544:web:c2aea3a13a8cc1551e1dd5"
};
// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
const auth = getAuth(appFirebase);



//=============SETUP=============
app.use(cors());
app.use(express.json());
// Serve HTML files
app.use(express.static("public"));
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.urlencoded({ extended: true }));

//=====================FUNCTIONS=============================

app.get('/message', (req, res) => {
    // Test to see if server can send message to client
    res.json({ message: "Hello from server!" });
});

app.post('/search', async(req,res)=> {
    console.log("Search Called")
    const { searchInput, limitToInventory } = req.body;

    const filterNames = []
    const filterValues = []

    console.log(searchInput);
    // if (searchInput !== '') {
    filterNames.push('ingredients');
    filterValues.push(searchInput);
    // }
    console.log(filterValues)
    // const filterNames = ['dietaryRestrictionsSatisfied', 'ingredients'];
    // const filterValues = ['vegan|halal|dairy-free', 'salt|pepper'];

    const response = await Recipe.search(filterNames, filterValues);
    const recipes = response;
    // console.log(recipes);
    res.json({recipes});
    // res.send('Hello, world!');
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
        // console.log('Search Result:', result);

        // Add more assertions based on your expected behavior
    } catch (error) {
        console.error('Test Error:', error.message);
    }
})();




// User Auth

// Handle registration form display (GET request)
// app.get('/register', (req, res) => {
//     res.sendFile(__dirname + '/public/register.html');
// });

// Handle registration (POST request)
app.post('/register', async (req, res) => {
    try {
        console.log('Registration route accessed.');
        const { email, password } = req.body;

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        console.log('Registration successful.');
        res.send('Registration successful!');
    } catch (error) {
        console.error('Registration Error:', error.message);
        res.send(`Registration failed: ${error.message}`);
    }
});

// Handle login form display (GET request)
// app.get('/login', (req, res) => {
//     res.sendFile(__dirname + '/public/login.html');
// });

// Handle login (POST request)
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        res.send('Login successful!');
    } catch (error) {
        console.error('Login Error:', error.message);
        res.send(`Login failed: ${error.message}`);
    }
});


//======================START============================


//Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
//! run `npm run dev` to start !



//==================================================
//Some old code


// Define some routes
// app.get('/', (req, res) => {
//     // res.send('Hello, world!');
//     // res.render('index')
//     res.sendFile(path.join(__dirname, './client_old/src/index'));
// });

// app.get('/recipe/:id', async(req,res)=>{
//
// })

/*=============================================*/
//This function will submit a recipe search request to the API

// app.post('/searchRecipes', async (req, res) => {
//   const { searchInput, limitToInventory } = req.body;
//
//   const filterNames = []
//   const filterValues = []
//
//   if (searchInput !== '') {
//     filterNames.push('recipeNames');
//     filterValues.push(searchInput);
//   }
//
//   if (limitToInventory) {
//     //Get ingredients from user's inventory
//   }
//   // const filterNames = ['dietaryRestrictionsSatisfied', 'ingredients'];
//   // const filterValues = ['vegan|halal|dairy-free', 'salt|pepper'];
//
//   try { //Submit search to API
//     const response = await Recipe.search(filterNames, filterValues);
//     const recipes = response; //Returns a list of Recipe objects
//     console.log('Search Result:', recipes);
//     res.json({ recipes });
//     // displaySearchResults(recipes);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// });