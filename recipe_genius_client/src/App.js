//=============IMPORT DEPENDENCIES=============
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
import "./App.css";

//=============IMPORT PAGES=============
import Home from "./pages/Home";
import Register from "./pages/Register";
import Recipe from "./pages/Recipe";
import Inventory from "./pages/Inventory";
import Profile from "./pages/Profile";

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
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          ></meta>
          <title>Recipe Genius</title>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
            integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
            crossOrigin="anonymous"
          />
          <link rel="stylesheet" href="styles.css"></link>
        </head>
        <body>
          <header className="App-header">
            <h1 className="header-title">Recipe Genius</h1>
            <div className="user-bar">
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/inventory">Inventory</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
              </ul>
            </div>
            <form
              action="/login"
              method="post"
              className="login-form"
            >
              <Row>
                <Col>
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                  ></input>
                </Col>
                <Col>
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                  ></input>
                </Col>
                <Col>
                  <button type="submit">Login</button>
                </Col>
              </Row>
            </form>
          </header>
          <main>
            <div className="App">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/recipe/:name" element={<Recipe />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </div>
          </main>
          <footer>
            <p>{message}</p>
          </footer>
        </body>
      </html>
    </BrowserRouter>
  );
}

export default App;
