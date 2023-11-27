//=============IMPORT DEPENDENCIES=============
import React, {useState, useEffect} from "react";
import "./App.css";
import {BrowserRouter, Routes, Route} from 'react-router-dom';

//=============IMPORT PAGES=============
import Home from './pages/Home';
import Register from './pages/Register';

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
            </head>
            <body>
            <header>
                <h1 className="header-title">Recipe Genius</h1>
                <div className="user-bar">
                    <ul>
                        <li><a href="/">Home</a></li>
                    <li><a href="/register">Register</a></li>
                    <li><a href="/login">Login</a></li>
                    </ul>
                </div>
                <form action="/login" method="post" className="login-form">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required></input>
                    <br></br>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required></input>
                    <br></br>
                    <button type="submit">Login</button>
                </form>
            </header>
            {/*<h1>Recipe Genius</h1>*/}
            <main>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/register" element={<Register/>}/>
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