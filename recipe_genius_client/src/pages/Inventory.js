import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import {Col, Row, Container, Button, Card, CardBody, CardHeader} from "react-bootstrap";


const Inventory = () => {
    const [selectedIngredient, setSelectedIngredient] = useState(''); // State to hold the selected item
    const [quantity, setQuantity] = useState(1);
    const [inventory, setInventory] = useState([]);

    useEffect(() => {
        // getInventory(); // Get inventory data on load
        const savedInventory = localStorage.getItem('inventory');
        if (savedInventory) {
            setInventory(JSON.parse(savedInventory));
        }

        searchIngredients() // Load ingredients on page load
    }, []);

    const saveInventory = (updatedInventory) => {
        setInventory(updatedInventory);
        localStorage.setItem('inventory', JSON.stringify(updatedInventory));
        // Save on backend
        try {
            axios.post('http://localhost:3001/inventorySave', {inventory: updatedInventory})
        } catch (err) {
            console.error('Error saving inventory', err);
        }
    }

    const getInventory = async () => {
        try {
            const response = await axios.get('http://localhost:3001/inventory');
            setInventory(response.data.inventory);
            saveInventory(response.data.inventory);
        } catch (error) {
            console.error('Error fetching inventory:', error);
        }
    };

    const addIngredient = async () => {
        const name = selectedIngredient.name
        if ((quantity >= 0 && quantity !== undefined) && (name !== undefined && name !== '')) {
            try {
                await axios.post('http://localhost:3001/inventoryAdd', {name, quantity});
                // Reset variables
                setSelectedIngredient('');
                setQuantity(1);
                getInventory(); // Get updated inventory after adding ingredient
            } catch (error) {
                console.error('Error adding item:', error);
            }
        } else {
            window.alert('Invalid Selection or Quantity.');
        }
    };

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

    const updateIngredient = async (index, newQuantity) => {
        if (newQuantity >= 0 && newQuantity !== undefined) {
            try {
                // Send index of ingredient and its new quantity to backend
                await axios.post('http://localhost:3001/inventoryUpdate', {index, newQuantity});
                getInventory(); // Get updated inventory after updating ingredient
            } catch (error) {
                console.error('Error updating quantity:', error);
            }
        } else {
            window.alert('Invalid Quantity.');
        }
    };

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const searchIngredients = async () => {
        // const searchTerm = "s";
        try {
            const response = await axios.get(`http://localhost:3001/ingredients?term=${searchTerm}`);
            console.log(response.data.itemsArray)
            setSearchResult(response.data.itemsArray)
        } catch (error) {
            console.error('Error searching:', error);
        }
    }

    return (
        <>
            <Container fluid>
                <h2>Inventory</h2>
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
                                   className="ingredient-search-searchbar"
                                   onChange={(e) => setSearchTerm(e.target.value)}/>
                            <button onClick={searchIngredients} className="ingredient-search-searchbar">Search</button>
                        </div>

                        <div>
                            <h4>Results:</h4>
                            <hr/>
                            {searchResult.map((item, index) => (
                                <li key={index} onClick={() => setSelectedIngredient(item)}
                                    className="ingredient-search-result">
                                    <Button className="ingredient-search-result">{item.name}</Button>
                                </li>
                            ))}
                        </div>
                    </Col>
                    <Col lg={4}>
                        <h3>Items</h3><hr/>
                        <ul>
                            {inventory && inventory.length > 0 && inventory.map((item, index) => (
                                <li key={index} className="inventory-item">
                                    <Card className="inventory-item">
                                        <div>
                                            <Row>
                                                <Col><h5>{item.name}</h5></Col>
                                                <Col>
                                                    <input type="number"
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
                                                <Col>
                                                    <button onClick={() => removeIngredient(index)}>Remove</button>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Card>
                                </li>
                            ))}
                        </ul>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Inventory;