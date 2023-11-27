import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import { Col, Row } from "react-bootstrap";


const Main = () => {
    // console.log('home: /')
    const inputRef = useRef(null);

    const [searchRecipeName, setSearchRecipeName] = useState("");
    const [selectedRecipeName, setSelectedRecipeName] = useState("");

    const [recipeList, setRecipeList] = useState([]);
    const [result, setResult] = useState('random');

    const handleSelectChange = (event) => {
        if (event.target.name === "recipeName") {
            setSearchRecipeName(event.target.value);
        }
    }
    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log("Event: ", event.target.name);
        if (event.target.name === "recipeName") {
            setSelectedRecipeName(searchRecipeName);
        }
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
        const getRecipe = async (query) => {
            console.log("getRecipe called")
            try {
                const searchData = { searchInput: query}
                const response = await fetch('http://localhost:3001/search', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(searchData)
                });
                console.log(response)
                if(!response.ok){

                    throw new Error("Error pulling recipe search.")
                }
                const {recipes} = await response.json()
                console.log(recipes);
                setRecipeList(recipes)
            } catch (err){
               console.error(err)
            }
        }

        getRecipe(selectedRecipeName);
        setResult(selectedRecipeName);
    }, [selectedRecipeName])

    return (
        <div className="container">
            <h1>Recipe Genius</h1>
            <div className="search-root">
                <div className="search-bar">
                    <input className="search-bar-input" type="text" name="recipeName" id="recipeName"
                           onChange={handleSelectChange} placeholder="Search Recipe (Currently only works with Ingredients)"
                           onKeyDown={handleKeyPress}/>
                    <button className="search-bar-btn" type="submit" name="recipeName"
                        onClick={handleFormSubmit} ref={inputRef}>
                        Search
                    </button>
                </div>
                <div className="search-results">
                    <Row className="recipe-list">
                        {recipeList.map((recipe) => (
                            <Col className="recipe" lg={5}>
                                <div key={recipe.name}>
                                    <h2>{recipe.name}</h2>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
        </div>
    );
};

export default Main;