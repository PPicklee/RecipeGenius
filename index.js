//Express Server for testing
import express from 'express';

const express = require('express');
const app = express();
const port = 3000; // Port number

// Define some routes
app.get('/', (req, res) => {
    res.send('Hello, world!');
  });

// Start the server
app.listen(port, () =>{
  console.log('RecipeGenius listening on port ${port}!');
});
 
