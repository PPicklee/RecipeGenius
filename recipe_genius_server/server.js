//=============IMPORTS=============
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth');
const { fileURLToPath } = require('url');
const { dirname } = require('path');
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://TestUser:RecipeGenius123@cluster0.26mtdnl.mongodb.net/?retryWrites=true&w=majority";

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

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

//=============SETUP=============
app.use(cors());
app.use(express.json());
// Serve HTML files
app.use(express.static("public"));
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.urlencoded({ extended: true }));

//=====================FUNCTIONS=============================

// Test function to make sure can connect to DB
async function runDB() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("Recipes").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
// runDB().catch(console.dir);

// Searches the DB for ingredients given a search term
app.get('/ingredients', async(req, res) => {
    // const { searchTerm } = req.body
    const searchTerm = req.query.term;
    try {
        await client.connect(); // Connect to db
        const database = await client.db("Recipes") // Get the database
        const collection = database.collection('Ingredients') // Get the Ingredients table
        // Parse the search term as a regular expression to match ingredients that contains the search term anywhere
        const regex = new RegExp(searchTerm, 'i')
        const findQuery = {name: {$regex: regex}}; //Set up find query

        try {
            const itemsCursor = await collection.find(findQuery).sort({name: 1}); // Initiate the search
            const itemsArray = await itemsCursor.toArray(); // Convert items returned to array
            // add a linebreak
            console.log();
            res.status(200).json({ itemsArray }) // Send back results
        } catch (err) {
            console.error(`Something went wrong trying to find the documents: ${err}\n`);
            res.status(500).json({error: 'Something went wrong trying to find the documents.'})
        }
    } finally {
        // Ensure the db connection is closed when finished
        await client.close();
    }
})

// Test to see if server can send message to client
app.get('/message', (req, res) => {
    res.json({ message: "Hello from server!" });
});

// Returns the recipe object at the specific ID
app.get('/recipe/:id', async(req,res)=>{
    const { id } = req.params;
    const recipe = await Recipe.getById(id);
    res.json({recipe});
});

// Given a set of search parameters, returns set of recipes
app.post('/search', async(req,res)=> {
    console.log("Search Called")
    const { recipeName, limitToInventory, ingredients, dietaryRestrictionsSatisfied, appliancesUsed, estimatedCost } = req.body;

    const filterNames = ['recipeName', 'ingredients', 'dietaryRestrictionsSatisfied', 'appliancesUsed', 'estimatedCost'];
    const filterValues = [recipeName, ingredients, dietaryRestrictionsSatisfied, appliancesUsed, estimatedCost];

    console.log("filterValues:", filterValues)

    const response = await Recipe.search(filterNames, filterValues);
    const recipes = response;
    res.json({recipes});
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

// Profile route
app.get('/profile', async (req, res) => {
    try {
        const user = await getCurrentUser(req);
        if (user) {
            // Assuming your user object contains the necessary information
            const registeredUser = new RegisteredUser(
                user.firstName,
                user.lastName,
                user.dateOfBirth,
                user.email,
                user.password
            );

            res.json({ registeredUser });
        } else {
            res.status(401).json({ message: 'User not authenticated' });
        }
    } catch (error) {
        console.error('Profile Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Function to get current user from Firebase authentication
const getCurrentUser = async (req) => {
    const token = req.headers.authorization;
    if (!token) return null;

    try {
        const userCredential = await auth.verifyIdToken(token);
        return userCredential && userCredential.user;
    } catch (error) {
        console.error('Get User Error:', error.message);
        return null;
    }
};



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


/* ==================================== */
/* ==============INVENTORY============= */
/* ==================================== */

let inventory = []; // Inventory array

// Returns the user's inventory
app.get('/inventory', (req, res) => {
    res.json({ inventory });
});

// Adds an ingredient to a user's inventory
app.post('/inventoryAdd', (req, res) => {
    const { name, quantity } = req.body; // Get ingredient name and quantity from request
    inventory.push({ name, quantity }); // Add item to inventory array
    res.status(201).json({ message: 'Ingredient added to inventory.' }); // Send success message
});

// Removes an ingredient from a user's inventory
app.post('/inventoryRemove', (req, res) => {
    const { index } = req.body; // Get index from request
    if (index >= 0 && index < inventory.length) {
        inventory.splice(index, 1); // Remove item at the specified index
        res.json({ message: 'Ingredient removed from inventory.' }); // Send success message
    } else { // If can't find index in inventory, error
        res.status(404).json({ error: 'Ingredient at ${index} not found.' });
    }
});

// Updates the quantity of an ingredient in a user's inventory
app.post('/inventoryUpdate', (req, res) => {
    const { index, newQuantity } = req.body; // Get index and quantity from request
    // If index valid
    if (index >= 0 && index < inventory.length) {
        if (newQuantity >= 0) {
            inventory[index].quantity = newQuantity; // Update specified ingredient quantity
            res.json({ message: 'Ingredient quantity updated.' }); // Send success message
        } else {
            res.status(400).json({ error: 'Invalid quantity.' });
        }
    } else { // If can't find index in inventory, send error
        res.status(404).json({ error: `Ingredient at index ${index} not found.` });
    }
});

// Saves the user's inventory
app.post('/inventorySave', (req, res) => {
    const updatedInventory = req.body.inventory; // Get inventory json from request
    inventory = updatedInventory; // Update the inventory
    res.status(200).json({ message: 'Inventory updated successfully' });
});

//======================START============================


//Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
//! run `npm run dev` to start !



// ==================================================
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