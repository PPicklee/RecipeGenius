import React, {useState, useEffect} from "react";
import axios from "axios";
import {Col, Row, Container, Button, Card} from "react-bootstrap";


const Inventory = () => {
    // Getter and setter Variables
    const [selectedIngredient, setSelectedIngredient] = useState(''); // State to hold the selected item
    const [quantity, setQuantity] = useState(1);
    const [inventory, setInventory] = useState([]);

    // Logic to run on page load
    useEffect(() => {
        // getInventory(); // Get inventory data on load
        // Get inventory data on load from local browser storage
        const savedInventory = JSON.parse(localStorage.getItem('inventory'));
        // console.log("Inventory:", inventory, typeof inventory);
        // console.log("Local Storage: ", savedInventory, typeof savedInventory);

        //Set Inventory and save it
        setInventory(savedInventory);
        saveInventory(savedInventory)
        // console.log("Inventory:", savedInventory, typeof savedInventory);

        searchIngredients() // Load ingredients on page load
    }, []);

    // Saves the current inventory with the items and quantities
    const saveInventory = (updatedInventory) => {
        setInventory(updatedInventory); //Updates the variable
        localStorage.setItem('inventory', JSON.stringify(updatedInventory)); // Save to local storage

        // Save on backend
        try {
            axios.post('http://localhost:3001/inventorySave', {inventory: updatedInventory}) // Make pose request
        } catch (err) {
            console.error('Error saving inventory', err);
        }
    }

    // Gets the Inventory from the backend
    const getInventory = async () => {
        try {
            const response = await axios.get('http://localhost:3001/inventory'); // Make get request
            // Set variable and save
            setInventory(response.data.inventory);
            saveInventory(response.data.inventory);
        } catch (error) {
            console.error('Error fetching inventory:', error);
        }
    };

    // Adds an ingredient to the inventory
    const addIngredient = async () => {
        const name = selectedIngredient.name // Get name from selected
        // If quantity and name are valid
        if ((quantity >= 0 && quantity !== undefined) && (name !== undefined && name !== '')) {
            try {
                await axios.post('http://localhost:3001/inventoryAdd', {name, quantity}); // Make post request

                // Reset variables
                setSelectedIngredient('');
                setQuantity(1);

                getInventory(); // Get updated inventory after adding ingredient
            } catch (error) {
                console.error('Error adding item:', error);
            }
        } else {
            window.alert('Invalid Selection or Quantity.'); // Tell user if invalid selection or quantity
        }
    };

    // Removes an ingredient from user's inventory
    const removeIngredient = async (index) => {
        try {
            // const updatedInventory = [...inventory];
            // updatedInventory.splice(index, 1); // Remove item from array
            // setInventory(updatedInventory);

            // Send index of removed item to backend to delete item from inventory
            await axios.post('http://localhost:3001/inventoryRemove', {index});
            getInventory(); // Get updated inventory after removing ingredient
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    // Updates quantity of an ingredient in user's inventory
    const updateIngredient = async (index, newQuantity) => {
        if (newQuantity >= 0 && newQuantity !== undefined) { // Check if valid quantity
            try {
                // Send index of ingredient and its new quantity to backend
                await axios.post('http://localhost:3001/inventoryUpdate', {index, newQuantity});
                getInventory(); // Get updated inventory after updating ingredient
            } catch (error) {
                console.error('Error updating quantity:', error);
            }
        } else {
            window.alert('Invalid Quantity.'); // Tell user if quantity invalid
        }
    };

    // Search getter and setter variables
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    // Asks the backend to search the database for
    const searchIngredients = async () => {
        try {
            // Make search request to backend
            const response = await axios.get(`http://localhost:3001/ingredients?term=${searchTerm}`);
            // Set search results
            console.log(response.data.itemsArray)
            setSearchResult(response.data.itemsArray)
        } catch (error) {
            console.error('Error searching:', error);
        }
    }

    // When enter button pressed, submit search
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            console.log("enter")
            // Trigger the search event
            searchIngredients()
        }
    }

    return (
        <>
            <Container fluid>
                <h1>Inventory</h1>
                <hr/>
                <Row>
                    <Col lg={4}>
                        <h3>Search</h3>
                        <hr/>
                        {selectedIngredient !== undefined && selectedIngredient !== '' && (
                            <div>
                                <h5>Selected Ingredient:</h5>
                                <ul className="ingredient-search-selected">
                                    <li className="ingredient-search-selected">
                                        <Card>
                                            <h3>{selectedIngredient.name}</h3>
                                            <input type="number" placeholder="Quantity" value={quantity}
                                                   className="ingredient-search-selected"
                                                   onChange={(e) => setQuantity(e.target.value)}/>
                                            <button onClick={addIngredient}>Add Ingredient</button>
                                        </Card>
                                    </li>
                                </ul>
                                <hr/>
                            </div>

                        )}
                        <div className="ingredient-search-searchbar">
                            <input type="text" placeholder="Search for Ingredients" value={searchTerm}
                                   className="ingredient-search-searchbar" onKeyDown={handleKeyPress}
                                   onChange={(e) => setSearchTerm(e.target.value)}/>
                            <button onClick={searchIngredients} className="ingredient-search-searchbar">Search</button>
                        </div>

                        <div>
                            <h4>Results:</h4>
                            <hr/>
                            <Container className="ingredient-search-results">
                                <Row>
                                    {searchResult.map((item, index) => (
                                        <Col key={index} onClick={() => setSelectedIngredient(item)}
                                             className="ingredient-search-result" sm={3} md={3} lg={3}>
                                            <Button className="ingredient-search-result-btn">{item.name}</Button>
                                        </Col>
                                    ))}
                                </Row>
                            </Container>
                        </div>
                    </Col>
                    <Col lg={3}></Col>
                    <Col lg={4}>
                        <h3>Items</h3>
                        <hr/>
                        <ul className="inventory-items">
                            {inventory && inventory.length > 0 && inventory.map((item, index) => (
                                <li key={index} className="inventory-item-card">
                                    <Card className="inventory-item">
                                        <div>
                                            <Row>
                                                <Col sm={4} lg={4}><h5>{item.name}</h5></Col>
                                                <Col sm={4} lg={4}>
                                                    <input type="number" className="inventory-item-input"
                                                           value={item.newQuantity !== undefined ? item.newQuantity : item.quantity}
                                                           onChange={(e) => {
                                                               const updatedInventory = [...inventory];
                                                               updatedInventory[index].newQuantity = parseInt(e.target.value, 10);
                                                               setInventory(updatedInventory);
                                                               const newQuantity = item.newQuantity
                                                               updateIngredient(index, newQuantity)
                                                           }}
                                                        // onBlur={(e) => {
                                                        //     const newQuantity = item.newQuantity
                                                        //     updateIngredient(index, newQuantity)
                                                        // }}
                                                    />
                                                </Col>
                                                <Col sm={4} lg={1}>
                                                    <Button style={{background:"red", border:"red"}} className="inventory-item-remove" onClick={() => removeIngredient(index)}>Remove</Button>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Card>
                                </li>
                            ))}
                        </ul>
                    </Col>
                </Row>
                <hr/>
            </Container>
        </>
    );
};

export default Inventory;