import React, {useState, useEffect, useRef} from "react";
import {Link} from 'react-router-dom';
import {Col, Row, Card, CardBody, CardGroup, Button} from "react-bootstrap";
import axios from "axios";


const Main = () => {
    const inputRef = useRef(null);
    const [searchRecipeName, setSearchRecipeName] = useState("");
    const [selectedRecipeName, setSelectedRecipeName] = useState("");
    const [recipeList, setRecipeList] = useState([]);
    const [result, setResult] = useState('random');
    const [searchButtonPressed, setSearchButtonPressed] = useState(false);

    const [searchIngredients, setSearchIngredients] = useState("");
    const [selectedIngredients, setSelectedIngredients] = useState("");
    const [selectedDietaryRestrictionsSatisfied, setSelectedDietaryRestrictionsSatisfied] = useState("");
    const [searchDietaryRestrictionsSatisfied, setSearchDietaryRestrictionsSatisfied] = useState("");
    const [searchAppliancesUsed, setSearchAppliancesUsed] = useState("");
    const [selectedAppliancesUsed, setSelectedAppliancesUsed] = useState("");
    const [searchEstimatedCost, setSearchEstimatedCost] = useState("");
    const [selectedEstimatedCost, setSelectedEstimatedCost] = useState("");

    const handleSelectChange = (event) => {
        if (event.target.name === "recipeName") {
            setSearchRecipeName(event.target.value);
        }
    }

    const handleIngredientsChange = (event) => {
        setSearchIngredients(event.target.value);
    }

    const handleDietaryRestrictionsSatisfiedChange = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
        setSearchDietaryRestrictionsSatisfied(selectedOptions.join('|'));
    }

    const handleAppliancesUsedChange = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
        setSearchAppliancesUsed(selectedOptions.join('|'));
    }

    const handleEstimatedCostChange = (event) => {
        setSearchEstimatedCost(event.target.value);
    }

    const handleFormSubmit = (event) => {
        // event.preventDefault();
        setSelectedRecipeName(searchRecipeName);
        setSelectedIngredients(searchIngredients);
        setSelectedIngredients(searchIngredients);
        setSelectedDietaryRestrictionsSatisfied(searchDietaryRestrictionsSatisfied);
        setSelectedAppliancesUsed(searchAppliancesUsed);
        setSelectedEstimatedCost(searchEstimatedCost);
        setSearchButtonPressed(prevState => !prevState); // Toggle the state
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            console.log("enter")
            // Trigger the search event
            handleFormSubmit()
        }
    }

    const [ingredientsInputValue, setIngredientsInputValue] = useState('');
    // Add all the ingredients from the user's inventory into the Ingredients field
    const addIngredientsFromInventory = async (event) => {
        try{
            const response = await axios.get('http://localhost:3001/inventory'); // Make get request
            const inventoryItems = response.data.inventory;
            console.log(response.data.inventory);
            // Extract name values from each object and create an array of names
            let namesArray = inventoryItems.map(obj => obj.name);
            const joinedNames = namesArray.join("|");
            setIngredientsInputValue(joinedNames)
            // console.log(joinedNames);
            document.getElementById('ingredients').value = joinedNames;
            setSearchIngredients(joinedNames)
        } catch(err){
            console.log("Error getting Inventory ingredients.", err)
        }
    }

    useEffect(() => {
        console.log("useEffect triggered")
        const getRecipe = async (recipeName, ingredients, dietaryRestrictionsSatisfied, appliancesUsed, estimatedCost) => {
            try {
                const searchData = {};
                if (recipeName) searchData.recipeName = recipeName;
                if (ingredients) searchData.ingredients = ingredients;
                if (dietaryRestrictionsSatisfied) searchData.dietaryRestrictionsSatisfied = dietaryRestrictionsSatisfied;
                if (appliancesUsed) searchData.appliancesUsed = appliancesUsed;
                if (estimatedCost) searchData.estimatedCost = estimatedCost;

                // If no fields are filled, set a default maximum cost
                if (!recipeName && !ingredients && !dietaryRestrictionsSatisfied && !appliancesUsed && !estimatedCost) {
                    searchData.estimatedCost = "1000";
                }

                console.log('Sending request with data:', searchData);
                const response = await fetch('http://localhost:3001/search', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(searchData)
                });
                if (!response.ok) {
                    throw new Error("Error pulling recipe search.")
                }
                const {recipes} = await response.json()
                console.log('Received response:', recipes);
                setRecipeList(recipes)
            } catch (err) {
                console.error(err)
            }
        }

        // Call the function with all the selected state variables
        getRecipe(selectedRecipeName, selectedIngredients, selectedDietaryRestrictionsSatisfied, selectedAppliancesUsed, selectedEstimatedCost);
        setResult(selectedRecipeName);
    }, [searchButtonPressed]);

    return (
        <div className="container">
            <h1>Recipe Genius</h1>
            <Row className="search-root">
                <Col className="search-bar">
                    <div className="fields-container">
                        <h3>Search</h3>
                        <hr/>
                        <Row>
                            <Col><h4>Recipe Name:</h4></Col>
                            <Col><input className="search-bar-input" type="text" name="recipeName" id="recipeName"
                                        onChange={handleSelectChange} placeholder="Search Recipe"
                                        onKeyDown={handleKeyPress}/></Col>
                        </Row>
                        <hr/>
                        <Row>
                            <Col><h4>Ingredients:</h4></Col>
                            <Col><Button onClick={addIngredientsFromInventory}>
                                Add Ingredients from inventory</Button></Col>
                            <Row><Col><input className="search-bar-input" type="text" name="ingredients" id="ingredients"
                                        onChange={handleIngredientsChange} placeholder="Search Ingredients"
                                        onKeyDown={handleKeyPress}/></Col></Row>

                            <Row><Col><em><small>To enter multiple ingredients, separate with a
                                pipe </small></em><small>('|')</small><em><small> character.</small></em></Col>

                            </Row>
                        </Row>
                        <hr/>
                        <Row>
                            <Col><h4>Dietary Restrictions Satisfied:</h4></Col>
                            <Col><select name="dietaryRestrictionsSatisfied" id="dietaryRestrictionsSatisfied"
                                    onChange={handleDietaryRestrictionsSatisfiedChange} multiple>
                                <option value="">None</option>
                                <option value="vegetarian">Vegetarian</option>
                                <option value="nutFree">Nut-free</option>
                                <option value="vegan">Vegan</option>
                                <option value="glutenFree">Gluten-free</option>
                                <option value="dairyFree">Dairy-free</option>
                                <option value="halal">Halal</option>
                            </select></Col>
                            <em><small>To select multiple restrictions, hold the 'control' key while selecting
                                restrictions.</small></em>
                        </Row>
                        <hr/>
                        <Row>
                            <Col><h4>Appliances Used:</h4></Col>
                            <Col><select name="appliancesUsed" id="appliancesUsed" onChange={handleAppliancesUsedChange}
                                    multiple>
                                <option value="">None</option>
                                <option value="stove">Stove</option>
                                <option value="oven">Oven</option>
                                <option value="grill">Grill</option>
                            </select></Col>
                            <em><small>To select multiple appliances, hold the 'control' key while selecting
                                appliances.</small></em>
                        </Row>
                        <hr/>
                        <Row>
                            <Col><h4>Maximum Cost:</h4></Col>
                            <Col><input className="search-bar-input" type="number" name="estimatedCost" id="estimatedCost"
                                   onChange={handleEstimatedCostChange} placeholder="Maximum Cost"
                                        onKeyDown={handleKeyPress}/></Col>
                        </Row>
                        <hr/>
                        <button className="search-bar-btn" type="submit" name="recipeName"
                                onClick={handleFormSubmit} ref={inputRef}>
                            Search
                        </button>
                    </div>
                </Col>
                <Col className="search-results">
                    <Row className="recipe-list">
                        <h3>Recipes</h3>
                        <hr/>
                        {recipeList.map((recipe, index) => {
                            console.log(recipe);
                            const recipeNameUrlFriendly = encodeURIComponent(recipe.name); // Make the recipe name URL-friendly
                            console.log(`/recipe/${recipeNameUrlFriendly}`); // Log the generated URL
                            return (
                                <Card className="recipe" lg={5} key={index}>
                                    <div>
                                        <h4>
                                            <Link to={`/recipe/${recipeNameUrlFriendly}`}>{recipe.name}</Link>
                                        </h4>
                                    </div>
                                </Card>
                            );
                        })}
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default Main;