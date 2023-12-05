import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import { Col, Row } from "react-bootstrap";


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
        event.preventDefault();
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
            event.preventDefault(); // Prevent form submission or other default behavior
            // Trigger the button click event
            if (inputRef.current) {
                inputRef.current.click(); // Invoke the button's click event
            }
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
                if(!response.ok){
                    throw new Error("Error pulling recipe search.")
                }
                const {recipes} = await response.json()
                console.log('Received response:', recipes);
                setRecipeList(recipes)
            } catch (err){
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
            <div className="search-root">
                <div className="search-bar">
                <div className="fields-container">
                    <h2>Recipe Name</h2>
                        <input className="search-bar-input" type="text" name="recipeName" id="recipeName"
                            onChange={handleSelectChange} placeholder="Search Recipe"/>
                        <h2>Ingredients</h2>
                        <em><small>To enter multiple ingredients, separate with a pipe </small></em><small>('|')</small><em><small> character.</small></em>
                        <input className="search-bar-input" type="text" name="ingredients" id="ingredients"
                            onChange={handleIngredientsChange} placeholder="Search Ingredients"/>
                        <h2>Dietary Restrictions Satisfied</h2>
                        <select name="dietaryRestrictionsSatisfied" id="dietaryRestrictionsSatisfied" onChange={handleDietaryRestrictionsSatisfiedChange} multiple>
                            <option value="">None</option>
                            <option value="vegetarian">Vegetarian</option>
                            <option value="nutFree">Nut-free</option>
                            <option value="vegan">Vegan</option>
                            <option value="glutenFree">Gluten-free</option>
                            <option value="dairyFree">Dairy-free</option>
                            <option value="halal">Halal</option>
                        </select>
                        <br/>
                        <em><small>To select multiple restrictions, hold the 'control' key while selecting restrictions.</small></em>
                        <h2>Appliances Used</h2>
                        <select name="appliancesUsed" id="appliancesUsed" onChange={handleAppliancesUsedChange} multiple>
                            <option value="">None</option>
                            <option value="stove">Stove</option>
                            <option value="oven">Oven</option>
                            <option value="grill">Grill</option>
                        </select>
                        <br/>
                        <em><small>To select multiple appliances, hold the 'control' key while selecting appliances.</small></em>
                        <h2>Maximum Cost</h2>
                        <input className="search-bar-input" type="number" name="estimatedCost" id="estimatedCost"
                            onChange={handleEstimatedCostChange} placeholder="Maximum Cost"/>
                        <button className="search-bar-btn" type="submit" name="recipeName"
                            onClick={handleFormSubmit} ref={inputRef}>
                            Search
                        </button>
                    </div>
                </div>
                <div className="search-results">
                    <Row className="recipe-list">
                        {recipeList.map((recipe, index) => {
                            console.log(recipe);
                            const recipeNameUrlFriendly = encodeURIComponent(recipe.name); // Make the recipe name URL-friendly
                            console.log(`/recipe/${recipeNameUrlFriendly}`); // Log the generated URL
                            return (
                                <Col className="recipe" lg={5} key={index}>
                                    <div>
                                        <h2>
                                            <Link to={`/recipe/${recipeNameUrlFriendly}`}>{recipe.name}</Link>
                                        </h2>
                                    </div>
                                </Col>
                            );
                        })}
                    </Row>
                </div>
            </div>
        </div>
    );
};

export default Main;