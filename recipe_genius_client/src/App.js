//=============IMPORT DEPENDENCIES=============
import React, {useState, useEffect} from "react";
import "./App.css";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Col, Row, Container} from 'react-bootstrap';

//=============IMPORT PAGES=============
import Home from './pages/Home';
import Register from './pages/Register';
import Recipe from './pages/Recipe';
import Inventory from "./pages/Inventory";

function App() {
    //=============VARIABLES=============
    const [message, setMessage] = useState("");

    //=============FUNCTIONS=============
    useEffect(() => {
        fetch("http://localhost:3001/message")
            .then((res) => res.json())
            .then((data) => setMessage(data.message));
    }, []);

    //=============HTML=============
    return (
        <BrowserRouter>
            <html lang="en">
            <head>
                <meta charSet="UTF-8"></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                <title>Recipe Genius</title>
                <link rel="stylesheet" href="styles.css"></link>
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
                    integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
                    crossOrigin="anonymous"
                />
            </head>
            <body>
            <header className="App-header">
                <h1 className="header-title">Recipe Genius</h1>
                <div className="user-bar">
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/inventory">Inventory</a></li>
                        <li><a href="/register">Register</a></li>
                        <li><a href="/login">Login</a></li>
                    </ul>
                </div>
                <form action="/login" method="post" className="login-form">
                    <Row>
                        <Col>
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" required></input>
                        </Col>
                        <Col>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" required></input>
                        </Col>
                        <Col>
                            <button type="submit">Login</button>
                        </Col>
                    </Row>
                </form>
            </header>
            {/*<h1>Recipe Genius</h1>*/}
            <main>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/recipe/:name" element={<Recipe/>}/>
                        <Route path="/inventory" element={<Inventory/>}/>
                    </Routes>
                </div>
            </main>
            <footer><p>{message}</p></footer>
            </body>
            </html>
        </BrowserRouter>
    );
}

export default App